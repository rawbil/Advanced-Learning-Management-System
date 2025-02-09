import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { CreateLayout } from '../controllers/layout.controller';
const route = express.Router();

//create layout
//api/v1/create-layout
route.post('/create-layout', authMiddleware, authorizeRoles("admin"), CreateLayout);

export default route;