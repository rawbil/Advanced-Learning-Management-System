import express from "express";
import { EditCourse, getSingleCourse, UploadCourse } from "../controllers/courseController";
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
route.get(
  "/get-course/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getSingleCourse
);
export default route;
