import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import layoutModel from "../models/layoutModel";
import { isArray } from "util";

//create layout
export const CreateLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      //check if type already exists. A single type can only appear once
      const isTypeExist = await layoutModel.findOne({type});
      if(isTypeExist) {
        return next(new ErrorHandler("Type already exists", 409));
      }
      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        if (!image || !title || !subTitle) {
          return next(new ErrorHandler("Please provide all the fields", 400));
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        };
        await layoutModel.create({type: "Banner", banner})
      }

      if (type === "FAQ") {
        const { faq } = req.body; //array\
        if (!Array.isArray(faq)) {
          return next(new ErrorHandler("FAQ must be an array", 400));
        }

        const faqData = faq.map((item: any) => ({
          question: item.question,
          answer: item.answer,
        }));
        await layoutModel.create({ type: "FAQ", faq: faqData });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        if (!Array.isArray(categories)) {
          return next(new ErrorHandler("Categories must be an array", 400));
        }

        const categoriesData = categories.map((item: any) => ({
          item: item.title,
        }));
        await layoutModel.create({
          type: "Categories",
          categories: categoriesData,
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Layout created successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
