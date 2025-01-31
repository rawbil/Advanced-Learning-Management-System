import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { createOrder, getAllOrders } from '../controllers/orderControllers';
const route = express.Router();

//api/v1/create-order
route.post('/create-order', authMiddleware, createOrder);

//api/v1/get-all-orders
route.get('/get-all-orders', authMiddleware, authorizeRoles("admin"), getAllOrders);

export default route;