import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { getNotifications, updateNotification } from '../controllers/notification.controller';
const route = express.Router();

//api/v1/get-notifications
route.post('/get-notifications', authMiddleware, authorizeRoles("admin"), getNotifications);
//api/v1/update-notification
route.put('/update-notification-status', authMiddleware, authorizeRoles('admin'), updateNotification)

export default route;