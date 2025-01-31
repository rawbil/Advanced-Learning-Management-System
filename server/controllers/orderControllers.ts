import { Request, Response, NextFunction } from "express";
import orderModel, { IOrder } from "../models/orderModel";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/userModel";
import courseModel from "../models/courseModel";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notificationModel";

//create order
export const createOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      const { courseId, payment_info } = req.body as IOrder;
      //find user
      const user = await userModel.findById(userId);
      //check if user already purchased this course
      const userCourseList = user?.courses.find(
        (course: any) => course._id.toString() === courseId
      );
      if (userCourseList) {
        return next(new ErrorHandler("Course already purchased", 400));
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const orderData = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const order = await orderModel.create(orderData);
      //send email
      const mailData = {
        order: {
          _id: course.id.slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        mailData
      );
      //send email
      try {
        await sendMail({
          subject: "Order Confirmation👌",
          template: "order-confirmation.ejs",
          email: user?.email as string,
          data: mailData,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push({ _id: courseId });
      await user?.save();

      //send notification to admin, saying order was created
      const notification = await notificationModel.create({
        title: "New Order",
        message: `You have a new order from ${course.name}`,
      });

      if (course.purchased === undefined) {
        course.purchased = 1;
      } else if (course.purchased === 0) {
        course.purchased = 1;
      } else {
        course.purchased += 1;
      }
      course?.save();
      //await courseModel.findByIdAndUpdate(courseId, { $inc: { purchased: 1 } });

      res.status(200).json({ success: true, order, course, notification });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders --admin
export const getAllOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await orderModel.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, orders });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
