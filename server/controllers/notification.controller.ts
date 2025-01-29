import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import notificationModel from "../models/notificationModel";

//get all notifications -- only for admin
export const getNotifications = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const notifications = await notificationModel.find().sort({createdAt: -1}) //sort it from latest

        res.status(200).json({success: true, notifications })
        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})