import { NextFunction, Request, Response } from 'express';
import tryCatch from './utils/tryCatch';
import cloudinary from 'cloudinary';
import TravelModel from '../models/Travel';
import ErrorHandler from '../utils/errorHandler';

export const createTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const image = data.image;
    if (image) {
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: 'travel',
      });
      data.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const travel = await TravelModel.create({
      ...data,
      creator: req.user?.name,
    });
    res.status(201).json({ success: true, travel });
  }
);

export const getAllTravels = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const travels = await TravelModel.find();
    res.status(200).json({ success: true, data: travels });
  }
);

export const getTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const travelId = req.params.id;
    const travel = await TravelModel.findById(travelId);
    res.status(200).json({ success: true, data: travel });
  }
);

export const getTravelsByCreator = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const name = req.query;
    const travels = await TravelModel.find(name);
    res.status(200).json({ success: true, data: travels });
  }
);

export const deleteTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const travel = await TravelModel.findById(id)
    if (!travel) {
      return next(new ErrorHandler('Travel not found', 404));
    }
    await travel.deleteOne({id})
    res.status(200).json({ success: true, message: "Travel deleted successfully" });
  }
);
