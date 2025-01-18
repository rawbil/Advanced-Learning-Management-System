import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import courseModel from "../models/courseModel";

//upload course
export const UploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const course = await courseModel.create(data);
      res.status(201).json({
        success: true,
        course,
        message: "Course created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface ICourseThumbnail {
  public_id: string;
  url: string;
}

//edit course
export const EditCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const courseId = req.params.id;
      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      if (thumbnail) {
        if (course.thumbnail.public_id) {
          await cloudinary.v2.uploader.destroy(course.thumbnail.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
          });

          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
            folder: "courses",
          });

          data.thumbnail = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };

        }
      }

      const updatedCourse = await courseModel.findByIdAndUpdate(courseId, {
        $set: data
      }, {new: true, runValidators: true})

      /* 
      --Explanation
      instead of updating the course from the database directly, you can update the data object, then use $set to add it to the database

          // Upload the new thumbnail to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
          width: 300,
          crop: "scale",
        });

        // Update the course's thumbnail with the new one
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // Update the course details in the database
      const updatedCourse = await courseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true, runValidators: true }
      );
       */

      res
        .status(200)
        .json({
          success: true,
          message: "Course updated successfully",
          updatedCourse,
        });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
