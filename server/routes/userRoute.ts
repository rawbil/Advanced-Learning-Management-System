import express from "express";
const router = express.Router();
import {
  activateUser,
  DeleteUser,
  getAllUsers,
  getUserInfo,
  LoginUser,
  LogoutUser,
  registerUser,
  SocialAuth,
  UpdateAccessToken,
  UpdateAvatar,
  UpdateUserInfo,
  UpdateUserPassword,
  UpdateUserRole,
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
router.put("/update-user", authMiddleware, UpdateUserInfo);

//update user password
//api/v1/update-password
router.put("/update-password", authMiddleware, UpdateUserPassword);

//update user avatar
//api/v1/update-avatar
router.put("/update-avatar", authMiddleware, UpdateAvatar);

//get all users ---admin
//api/v1/get-all-useres
router.get('/get-all-users', authMiddleware, authorizeRoles("admin"), getAllUsers);

//update user role --admin
//api/v1/update-role
router.put('/update-role', authMiddleware, authorizeRoles("admin"), UpdateUserRole);

//delete user --admin
router.delete('/delete-user', authMiddleware, authorizeRoles("admin"), DeleteUser)
export default router;
