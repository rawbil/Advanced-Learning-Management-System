import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import userRouter from "./routes/userRoute";
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route'

import errorMiddleware from "./middleware/error";
//END OF IMPORTS

//body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//cookie-parser
app.use(cookieParser());

//cors - Cross-Origin Resource Sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//routes
app.use("/api/v1", userRouter, courseRouter, orderRouter);

//testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ success: true, message: "API is working" });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

//error page
app.use((req: Request, res: Response, err: any) => {
  res
    .status(err.statusCode || 500)
    .json({
      success: "false",
      message: err.message || "Internal Server error",
    });
});

app.use(errorMiddleware);
