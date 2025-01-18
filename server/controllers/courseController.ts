import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import courseModel from "../models/courseModel";
import { redis } from "../utils/redis";

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
      return next(new ErrorHandler(error.message, 500));
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

      const updatedCourse = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true, runValidators: true }
      );

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

      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        updatedCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get single course --without purchasing
export const getSingleCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      //check if course is already cached in redis
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({ success: true, course });
      } else {
        const course = await courseModel
          .findById(req.params.id)
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          ); // without purchasing the course, we limit the data the user gets. Only after purchasing the course will the user get all the course details

        //add course session to redis
        await redis.set(courseId, JSON.stringify(course));

        res
          .status(201)
          .json({ success: true, course, message: "Course fetched." });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all courses --without purchasing
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);
        res.status(200).json({ success: true, courses });
      } else {
        const courses = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
          );

        await redis.set("allCourses", JSON.stringify(courses));

        res.status(201).json({ success: true, courses });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get single course -- valid user
export const getCourseByUser = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
    try {
        const courseId = req.params.id;
        const userCourseList = req.user?.courses;
        const courseExists = userCourseList?.find((course: any) => courseId === course._id as string);
        if(!courseExists) {
            return next(new ErrorHandler("You are not eligible for this course", 404));
        }

        const course = await courseModel.findById(courseId);
        const content = course?.courseData;

        res.status(200).json({success: true, content});

        
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
})
