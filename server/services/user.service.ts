import { NextFunction, Response } from "express";
import userModel from "../models/userModel";
import { redis } from "../utils/redis";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  //const user = await userModel.findById(id);
  const JsonUser = await redis.get(id) as string;
  const user = JSON.parse(JsonUser);
  res.status(201).json({ success: true, user });
};


//get all users
export const getAllUsers = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.find().select("-password").sort({createdAt: -1});

    res.status(200).json({success: true, users});
    
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500))
  }
})