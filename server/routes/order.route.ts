import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createOrder } from '../controllers/orderControllers';
const route = express.Router();

//api/v1/create-order
route.post('/create-order', authMiddleware, createOrder);

export default route;