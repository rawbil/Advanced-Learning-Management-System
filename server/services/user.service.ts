import { NextFunction, Response } from "express";
import userModel from "../models/userModel";
import { redis } from "../utils/redis";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  //const user = await userModel.findById(id);
  const JsonUser = (await redis.get(id)) as string;
  const user = JSON.parse(JsonUser);
  res.status(201).json({ success: true, user });
};

//get all users --admin
export const getAllUsersService = async (res: Response) => {
  const users = await userModel
    .find()
    .sort({ createdAt: -1 })
    .select("-password");
  res.status(200).json({ success: true, users });
};
