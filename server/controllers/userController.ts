import {Request, Response, NextFunction } from 'express';
import userModel, {IUser} from '../models/userModel';
import ErrorHandler from '../utils/ErrorHandler';
import catchAsyncErrors from '../middleware/catchAsyncErrors';

//register user