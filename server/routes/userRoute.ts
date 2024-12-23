import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/userController';


//register user
router.post('/registration', registerUser);

export default router;