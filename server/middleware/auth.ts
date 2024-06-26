import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler';
import tryCatch from '../controllers/utils/tryCatch';
import UserModel from '../models/User';

// authenticated user
export const isAuthenticated = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(
        new ErrorHandler('Please login to access this resources', 400)
      );
    }

    const decoded = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler('Access token is not valid', 400));
    }

    req.user = await UserModel.findById(decoded.id);

    next();
  }
);

