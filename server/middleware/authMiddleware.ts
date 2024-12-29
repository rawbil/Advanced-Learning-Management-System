import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from 'jsonwebtoken'
import userModel from "../models/userModel";
import { redis } from "../utils/redis";

export const authMiddleware = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const access_token = req.cookies.access_token;
        if(!access_token) {
            return next(new ErrorHandler("Authenticatoin failed. Please login ", 400));
        }

        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as JwtPayload;
        if(!decoded) {
            return next(new ErrorHandler("Access token is not valid", 400));
        }
       // req.id = decoded.id;

       // const user = await userModel.findById(decoded.id);

       //fetch user from redis
        const user = await redis.get(decoded.id);
        if(!user) {
            return next(new ErrorHandler("User not found", 400));
        }

        req.user = JSON.parse(user);
        next();

    } catch (error) {
        return next(new ErrorHandler("Authentication Failed", 400));
    }
})