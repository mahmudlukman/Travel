// import { NextFunction, Request, Response } from "express";

// export const catchAsyncError =
//   (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(theFunc(req, res, next)).catch(next);
//   };
import { Request, Response, NextFunction } from 'express';

const tryCatch = (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Something went wrong! Try again later" });
    }
  };
};

export default tryCatch;


