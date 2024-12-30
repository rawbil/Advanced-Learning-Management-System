import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/userModel";
import ErrorHandler from "../utils/ErrorHandler";
import catchAsyncErrors from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
require("dotenv").config();
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";

//register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExists = await userModel.findOne({ email });
      if (isEmailExists) {
        return next(new ErrorHandler("Email already exists", 409));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;
      // const activationLink = `${process.env.ORIGIN}/user/activate/${activationCode}`;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mails.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mails.ejs",
          data: data,
        });
        res.status(200).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

//activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });

      res
        .status(200)
        .json({ success: true, message: "User created successfully", user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Login User
interface ILoginRequest {
  email: string;
  password: string;
}

export const LoginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please fill in all the fields", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      //compare password
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      //call sendToken and set cookies
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Logout user
export const LogoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 }); //sets access_token cookie to an empty string and maxAge to 1 millisecond, effectively removing it.
      res.cookie("refresh_token", "", { maxAge: 1 });

      //When you log out, you also need to delete the user from redis client
      const redisUser = req.user?._id;
      if (redisUser) {
        console.log(`Deleting user session from redis: ${redisUser}`);
        await redis.del(redisUser.toString());
      } else {
        console.log("No user ID found");
      }

      res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access token using refresh token
export const UpdateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (!refreshToken) {
        return next(new ErrorHandler("Refresh token not found", 401));
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      if (!decoded) {
        return next(new ErrorHandler("Refresh token not found", 400));
      }

      // const user = await userModel.findById(decoded.id);

      const session = await redis.get(decoded.id);
      if (!session) {
        return next(new ErrorHandler("User does not exist", 401));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN as string, {
        expiresIn: "5m",
      });

      const refresh_token = jwt.sign({id: user._id}, process.env.REFRESH_TOKEN as string, {
        expiresIn: "7d",
      })

      res.cookie("access_token",accessToken, accessTokenOptions)

      res.cookie("refresh_token", refresh_token, refreshTokenOptions);

      res.status(200).json({success: true, accessToken})

    
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
