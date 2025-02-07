import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { getUserAnalytics } from '../controllers/analytics.controller';
import router from './userRoute';
const route = express.Router();

//users analytics route
//api/v1/users-analytics
route.get('/users-analytics', authMiddleware, authorizeRoles("admin"), getUserAnalytics);

export default router;