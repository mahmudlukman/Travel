import UserModel from '../models/User';
import ErrorHandler from '../utils/errorHandler';
import tryCatch from './utils/tryCatch';
import { NextFunction, Request, Response } from 'express';

export const register = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { firstName, lastName, email, password } = req.body;

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return next(new ErrorHandler('Email already exist', 400));
    }

    const user = await UserModel.create({
      name: `${firstName} ${lastName}`,
      email,
      password,
    });
    res.status(201).json({ success: true, result: user });
  }
);
