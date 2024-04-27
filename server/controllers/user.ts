import UserModel from '../models/User';
import ErrorHandler from '../utils/errorHandler';
import { sendToken } from '../utils/jwt';
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
    res.status(201).json({ success: true, user });
  }
);

// Login user
interface ILoginRequest {
  email: string;
  password: string;
}
export const login = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILoginRequest;

    if (!email || !password) {
      return next(new ErrorHandler('Please enter email and password', 400));
    }
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }
    sendToken(user, 200, res);
  }
);
export const logout = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie('access_token', '', {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  }
);

// get user info
export const getUserInfo = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;
    const user = await UserModel.findById(userId);
    res.status(200).json({ success: true, user });
  }
);
