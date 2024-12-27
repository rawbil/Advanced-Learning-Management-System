import express from "express";
const router = express.Router();
import { activateUser, LoginUser, registerUser } from "../controllers/userController";

//register user
//api/v1/registration
router.post("/registration", registerUser);

//activate user
//api/v1/activate-user
router.post("/activate-user", activateUser);

//login user
//api/v1/login
router.post("/login", LoginUser);

export default router;
