import express from "express";
import {
  AddAnswer,
  AddCourseReview,
  addQuestion,
  AddReviewReply,
  deleteCourse,
  EditCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  UploadCourse,
} from "../controllers/courseController";
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
route.get("/get-course/:id", getSingleCourse);
//api/v1/courses
//all users can access this route
route.get("/courses", getAllCourses);
//api/v1/course-content/id
//only for valid users
route.get("/course-content/:id", authMiddleware, getCourseByUser);
//add question
//api/v1/add-question
route.put("/add-question", authMiddleware, addQuestion);
//add answer
//api/v1/add-answer
route.put("/add-answer", authMiddleware, AddAnswer);
//add review
//api/v1/add-review/:id
route.put("/add-review/:id", authMiddleware, AddCourseReview);
//add review reply
//api/v1/add-review-reply
route.put(
  "/add-review-reply",
  authMiddleware,
  authorizeRoles("admin"),
  AddReviewReply
);
//get all courses --- admin
//api/v1/admin-get-courses
route.get(
  "/admin-get-courses",
  authMiddleware,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);
//delete course --admin
//api/v1/delete-course/:id
route.delete('/delete-course/:id', authMiddleware, authorizeRoles("admin"), deleteCourse);

export default route;
