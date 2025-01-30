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

//update notification status -- only admin
export const updateNotification = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {notificationId} = req.body;
        const notification = await notificationModel.findById(notificationId);
        if(!notification) {
            return next(new ErrorHandler("Notification not found", 404));
        }

        notification.status = "read";
        await notification.save();
        
        //re-arrange notifications
        const notifications = await notificationModel.find().sort({updatedAt: 1})

        res.status(200).json({success: true, notifications})
        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
})