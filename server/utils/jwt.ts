require("dotenv").config();
import { Response, Request, NextFunction } from "express";
import { IUser } from "../models/userModel";
import { redis } from "./redis";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | undefined;
  secure?: boolean; //determines if cookie should be sent over https, which is more secure.
  //for this reason, it should only be used in production
}

  //parse environment variables to integrate fallback values
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "5"); //5m
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "7"); //7 days

  //cookies options
  export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 1000), //current date + duration in milliseconds
    maxAge: accessTokenExpire * 60 * 1000, //convert to milliseconds
    httpOnly: true,
    sameSite: "lax", //controlling the cross-site request behavior of the cookie.
  };

  export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire *24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };


export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session to redis
  redis.set(user._id as string, JSON.stringify(user) as any);


  //set secure: true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
    // refreshTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({ success: true, user, accessToken });
};
