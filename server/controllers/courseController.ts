import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary'
import courseModel from "../models/courseModel";


//upload course
export const UploadCourse = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if(thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });

            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        }

        const course = await courseModel.create(data);
        res.status(201).json({success: true, course, message: "Course created successfully"});
        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    }
})