import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { getUserAnalytics } from '../controllers/analytics.controller';
const route = express.Router();

//users analytics route
//api/v1/user-analytics
route.get('/user-analytics', authMiddleware, authorizeRoles("admin"), getUserAnalytics);