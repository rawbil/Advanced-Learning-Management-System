require('dotenv').config();
import { Response, Request, NextFunction } from "express";
import { IUser } from "../models/userModel";
import { redis } from "./redis";

interface ITokenOptions {
    expires: Date,
    maxAge: number,
    httpOnly: boolean,
    sameSite: 'lax' | 'strict' | undefined,
    secure?: boolean //determines if cookie should be sent over https, which is more secure.
    //for this reason, it should only be used in production
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    //upload session to redis


    //parse environment variables to integrate fallback values
    const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300", 10); //5m
    const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || '1200', 10); //20m

    //cookies options
    const accessTokenOptions: ITokenOptions = {
        expires: new Date(Date.now() + accessTokenExpire * 1000), //current date + duration in milliseconds
        maxAge: accessTokenExpire * 1000, //convert to milliseconds
        httpOnly: true,
        sameSite: 'lax' //controlling the cross-site request behavior of the cookie.
    } 


    const refreshTokenOptions: ITokenOptions = {
        expires: new Date(Date.now() + refreshTokenExpire * 1000),
        maxAge: accessTokenExpire * 1000,
        httpOnly: true,
        sameSite: 'lax'
    } 

    //set secure: true in production
    if(process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true;
       // refreshTokenOptions.secure = true;
    }

    res.cookie("access_token", accessTokenOptions);
    res.cookie("refresh_token", refreshTokenOptions);

    res.status(statusCode).json({success: true, user, accessToken})
    
}