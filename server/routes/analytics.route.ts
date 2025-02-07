import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { getCoursesAnalytics, getUserAnalytics } from '../controllers/analytics.controller';
const route = express.Router();

//users analytics route
//api/v1/users-analytics
route.get('/users-analytics', authMiddleware, authorizeRoles("admin"), getUserAnalytics);
//api/v1/courses-analytics
route.get('/courses-analytics', authMiddleware, authorizeRoles("admin"), getCoursesAnalytics);

export default route;