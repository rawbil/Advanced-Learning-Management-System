import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { getCoursesAnalytics, getOrderAnalytics, getUserAnalytics } from '../controllers/analytics.controller';
const route = express.Router();

//users analytics route
//api/v1/users-analytics
route.get('/users-analytics', authMiddleware, authorizeRoles("admin"), getUserAnalytics);
//api/v1/courses-analytics
route.get('/courses-analytics', authMiddleware, authorizeRoles("admin"), getCoursesAnalytics);
//api/v1/order-analytics
route.get('/order-analytics', authMiddleware, authorizeRoles("admin"), getOrderAnalytics);

export default route;