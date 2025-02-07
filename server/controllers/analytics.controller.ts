import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics";
import userModel from "../models/userModel";

//get users analytics --- only for admin
const getUserAnalytics = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await generateLast12MonthsData(userModel);

        res.status(200).json({success: true, message: "User Analytics", users}); 
        
    } catch (error: any) {
       return next(new ErrorHandler(error.message, 500)); 
    }
})
