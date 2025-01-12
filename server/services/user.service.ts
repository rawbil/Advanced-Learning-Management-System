import { Response } from "express";
import userModel from "../models/userModel";
import { redis } from "../utils/redis";

//get user by id
export const getUserById = async (id: string, res: Response) => {
  //const user = await userModel.findById(id);
  const JsonUser = await redis.get(id) as string;
  const user = JSON.parse(JsonUser);
  res.status(201).json({ success: true, user });
};
