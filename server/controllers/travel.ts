import { NextFunction, Request, Response } from 'express';
import tryCatch from './utils/tryCatch';
import cloudinary from 'cloudinary';
import TravelModel from '../models/Travel';

export const createTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const thumbnail = data.selectedFile;
    if (thumbnail) {
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: 'travel',
      });
      data.thumbnail = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const travel = await TravelModel.create({ ...data, creator: req.user?.name });
    res.status(201).json({ success: true, travel });
  }
);
