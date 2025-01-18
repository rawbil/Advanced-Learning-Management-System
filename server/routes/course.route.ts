import express from "express";
import { EditCourse, UploadCourse } from "../controllers/courseController";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";
const route = express.Router();

//api/v1/create-course
route.post(
  "/create-course",
  authMiddleware,
  authorizeRoles("admin"),
  UploadCourse
);
//api/v1/edit-course
route.put(
  "/edit-course",
  authMiddleware,
  authorizeRoles("admin"),
  EditCourse
);

export default route;
