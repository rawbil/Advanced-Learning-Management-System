import express from 'express';
import { authMiddleware, authorizeRoles } from '../middleware/authMiddleware';
import { CreateLayout, UpdateLayout } from '../controllers/layout.controller';
const route = express.Router();

//create layout
//api/v1/create-layout
route.post('/create-layout', authMiddleware, authorizeRoles("admin"), CreateLayout);
//update layout
//api/v1/update-layout
route.put('/update-layout', authMiddleware, authorizeRoles("admin"), UpdateLayout);

export default route;