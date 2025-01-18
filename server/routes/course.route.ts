import express from "express";
import { EditCourse, getAllCourses, getSingleCourse, UploadCourse } from "../controllers/courseController";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";
const route = express.Router();

//api/v1/create-course
route.post(
  "/create-course",
  authMiddleware,
  authorizeRoles("admin"),
  UploadCourse
);
//api/v1/edit-course/id
route.put(
  "/edit-course/:id",
  authMiddleware,
  authorizeRoles("admin"),
  EditCourse
);
//api/v1/course/id
//all users can access this route
route.get(
  "/get-course/:id",
  getSingleCourse
);
//api/v1/courses
//all users can access this route
route.get(
  "/courses",
  getAllCourses
);
export default route;
