import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import layoutModel from "../models/layoutModel";

//create layout
export const CreateLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
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
        await layoutModel.create(banner);
      }

      if(type === "FAQ") {
        const {faq} = req.body;
        await layoutModel.create(faq);
      }

      if(type === "Categories") {
        const {categories} = req.body;
        await layoutModel.create(categories);
      }

      res.status(200).json({success: true, message: "Layout created successfully"});

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
