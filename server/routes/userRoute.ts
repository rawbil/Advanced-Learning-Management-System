import express from 'express';
const router = express.Router();
import { activateUser, registerUser } from '../controllers/userController';


//register user
//api/v1/registration
router.post('/registration', registerUser);

//activate user
//api/v1/activate-user
router.post('/activate-user', activateUser);

export default router;