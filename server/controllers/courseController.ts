import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import courseModel from "../models/courseModel";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from 'ejs';
import path from "path";
import sendMail from "../utils/sendMail";
import { IUser } from "../models/userModel";
require('dotenv').config();

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
export const getCourseByUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const userCourseList = req.user?.courses;
      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible for this course", 404)
        );  
      }

      const course = await courseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({ success: true, content });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId } = req.body as IAddQuestionData;
      const course = await courseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData.find(
        (content: any) => content._id.toString() === contentId
      );
      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 404));
      }

      //create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };
      //add the question to the course content
      courseContent.questions.push(newQuestion);

      //save the updated course 
      await course?.save();

      res.status(200).json({success: true, course})
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);


//add answer in course question
interface IAddAnswer {
  courseId: string,
  contentId: string,
  questionId: string,
  answer: string,
}

export const AddAnswer = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {courseId, contentId, questionId, answer} = req.body as IAddAnswer;
    const course = await courseModel.findById(courseId);
    const content = course?.courseData.find((content: any) => content._id === contentId);
    if(!content) {
      return next(new ErrorHandler("Content not found", 404));
    };

    const question = content.questions.find((quiz: any) => quiz._id === questionId);
    if(!question) {
      return next(new ErrorHandler("Question not found", 404));
    }

    const questionReply: any = {
      user: req.user,
      answer,
    }

    question.questionReplies?.push(questionReply);

    await course?.save();

    //notification to the owner of the email
    if(req.user?._id ===  question.user._id) {
      //create notification
    } else {
      const data = {
        name: question.user.name,
        title: content.title
      }
      const html = await ejs.renderFile(path.join(__dirname, '../mails/question-reply.ejs'), data);

      try {
        await sendMail({
          email: question.user.email,
          subject: "Question Reply",
          data,
          template: "question-reply.ejs",
        })
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
    
    res.status(200).json({success: true, course})
    
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
})

//add review in course
interface IReviewData {
  review: string,
  rating: number,
}

export const AddCourseReview = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
  try {
   const courseId = req.params.id;
   const userCourseList = req.user?.courses;
   const courseExists = userCourseList?.find((course: any) => course._id.toString() === courseId);
   if(!courseExists) {
    return next(new ErrorHandler("You are not eligible to access this course ", 404));
   }

   const course = await courseModel.findById(courseId);

   const {review, rating}: IReviewData = req.body;

   const reviewData: any = {
    user: req.user as IUser,
    comment: review,
    rating,
   }

   course?.reviews.push(reviewData);

   let totalReviews = 0;
   course?.reviews.forEach((rev: any) => {
    totalReviews += rev.rating;
   })

   if (course) {
     course.ratings = totalReviews / course.reviews.length;
   }
   await course?.save();

   const notification = {
    title: "New Review Received",
    message: `${req.user?.name} added a review in the course: ${course?.name}`
   }

   //create notification

   res.status(200).json({success: true, course});

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  } 
})

/* //add review reply
export const AddReviewReply = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {answer, reviewId} = req.body;
    const courseId = req.params.id;
    const course = await courseModel.findById(courseId);
    if(!course) {
      return next(new ErrorHandler(`Course with id: ${courseId} not found`, 404));
    }

    const review = course.reviews.find((item: any) => item._id.toString() === reviewId);
    if(!review) {
      return next(new ErrorHandler("Course review not found", 404));
    }

    const reviewReply: any = {
      user: req.user,
      answer,
    }

    review.commentReplies?.push(reviewReply);
    await course.save();
    
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  } 
}) */