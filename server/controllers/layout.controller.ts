import { Request, Response, NextFunction } from "express";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import layoutModel, { Layout } from "../models/layoutModel";

//create layout
export const CreateLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      //check if type already exists. A single type can only appear once
      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
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
        await layoutModel.create({ type: "Banner", banner });
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


// Update layout
export const UpdateLayout = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type } = req.body;

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;
      if (!image && !title && !subTitle) {
        return next(new ErrorHandler("Update at least one field", 400));
      }

      const layout = await layoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler(`Layout ${type} not found`, 404));
      }

      // Preserve existing banner fields
      
      const updatedBanner = {
        image: layout.banner.image as any,
        title: layout.banner.title,
        subTitle: layout.banner.subTitle,
      };

      if (image) {
        // Delete the old image from Cloudinary if it exists
        if (layout.banner && layout.banner.image.public_id) {
          await cloudinary.v2.uploader.destroy(layout.banner.image.public_id);
        }

        // Upload the new image to Cloudinary
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });

        // Update the image field
        updatedBanner.image = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        } 
      }

      if (title) {
        updatedBanner.title = title;
      }

      if (subTitle) {
        updatedBanner.subTitle = subTitle;
      }

      // Update the layout with the new banner
      layout.banner = updatedBanner;
      await layout.save();

      res.status(200).json({ success: true, message: "Banner updated successfully", layout });
    } 

    if(type === "FAQ") {
      const {faq} = req.body; // you have to add a new array each time?
      const faqItem = await layoutModel.findOne({type});
      const faqData = faq.map((item: any) => ({
        question: item.question,
        answer: item.answer,
      }));

     const newLayout = await layoutModel.findByIdAndUpdate(faqItem?._id, {
        type: "FAQ",
        faq: faqData,
      }, {new: true});
      res.status(200).json({success: true, newLayout});
    }

    if(type === "Categories") {
      const {categories} = req.body;
      const categoriesItem = await layoutModel.findOne({type});
      const categoriesData = categories.map((item: any) => ({
        title: item.title,
      }));
     const newLayout =  await layoutModel.findByIdAndUpdate(categoriesItem?._id, {
        type: "Categories",
        categories: categoriesData,
      }, {new: true});
      res.status(200).json({success: true, newLayout})
    };

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//Get layout by type
export const GetLayoutByType = catchAsyncErrors(async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {type} = req.body;
    const layout = await layoutModel.findOne({type});
    if(!layout) {
      return next(new ErrorHandler(`Layout with type: ${type} not found`, 404));
    }
    res.status(200).json({success: true, layout});
    
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
})