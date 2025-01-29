import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { getNotifications } from '../controllers/notification.controller';
const route = express.Router();

//api/v1/get-notifications
route.post('/get-notifications', authMiddleware, authorizeRoles("admin"), getNotifications);

export default route;