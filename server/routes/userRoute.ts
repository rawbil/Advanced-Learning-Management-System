import express from "express";
const router = express.Router();
import { activateUser, LoginUser, LogoutUser, registerUser } from "../controllers/userController";

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
router.post("/logout", LogoutUser);

export default router;
