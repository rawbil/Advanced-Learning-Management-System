import express from "express";
const router = express.Router();
import {
  activateUser,
  getUserInfo,
  LoginUser,
  LogoutUser,
  registerUser,
  SocialAuth,
  UpdateAccessToken,
  UpdateUserInfo,
} from "../controllers/userController";
import { authMiddleware, authorizeRoles } from "../middleware/authMiddleware";

//register user
//api/v1/registration
router.post("/registration", registerUser);

//activate user
//api/v1/activate-user
router.post("/activate-user", activateUser);

//login user
//api/v1/login
router.post("/login", LoginUser);

//logout user
//api/v1/logout
router.post("/logout", authMiddleware, LogoutUser);

//update access token
//api/v1/refresh-token
router.post("/refresh-token", UpdateAccessToken);

//get user info
//api/v1/get-user
router.get("/get-user", authMiddleware, getUserInfo);

//social-auth
//api/v1/social-auth
router.post("/social-auth", SocialAuth);

//update user info
//api/v1/update-user
router.post("/update-user", authMiddleware, UpdateUserInfo);

export default router;
