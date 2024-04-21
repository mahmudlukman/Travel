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
    const travel = (await TravelModel.findById(travelId)) as any;
    if (!travel || travel.length === 0) {
      return next(new ErrorHandler('No travel found for ${name}', 404));
    }
    res.status(200).json({ success: true, data: travel });
  }
);

export const getTravelsByUser = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const userTravelList = req.user?.travels;
    const travelId = req.params.id;

    const travelExists = userTravelList?.find(
      (travel: any) => travel._id.toString() === travelId
    );
    res.status(200).json({ success: true, data: travels });
  }
);
// export const getTravelsByCreator = tryCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { name } = req.query.creator as any;
//     const travels = await TravelModel.find({
//       creator: { $regex: new RegExp(name as string, 'i') },
//     });
//     res.status(200).json({ success: true, data: travels });
//   }
// );

export const deleteTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const travel = await TravelModel.findById(id);
    if (!travel) {
      return next(new ErrorHandler('Travel not found', 404));
    }
    await travel.deleteOne({ id });
    res
      .status(200)
      .json({ success: true, message: 'Travel deleted successfully' });
  }
);

export const updateTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const image = data.image;
    const travelId = req.params.id;
    const travelData = await TravelModel.findById(travelId);

    if (!travelData) {
      return next(new ErrorHandler('Travel not found', 400));
    }
    if (image && typeof image === 'string' && !image.startsWith('https')) {
      if (travelData.image && travelData.image.public_id) {
        await cloudinary.v2.uploader.destroy(travelData.image.public_id);
      }
      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: 'travel',
      });
      data.image = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else if (
      image &&
      typeof image === 'string' &&
      image.startsWith('https')
    ) {
      // Keep existing image
      data.image = {
        public_id: travelData.image?.public_id || '',
        url: travelData.image?.url || '',
      };
    }

    const updatedTravel = await TravelModel.findByIdAndUpdate(
      travelId,
      { $set: data },
      { new: true }
    );

    if (!updatedTravel) {
      return next(new ErrorHandler('Failed to update travel', 400));
    }

    res.status(200).json({ success: true, data: updatedTravel });
  }
);

export const likeTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!req.user) {
      return next(new ErrorHandler('Unauthenticated', 400));
    }

    const travel = await TravelModel.findById(id);

    if (!travel) {
      return next(new ErrorHandler('Travel not found', 404));
    }

    const index = travel.likes.findIndex(
      (userId) => userId === req.user._id.toString()
    );

    if (index === -1) {
      travel.likes.push(req.user._id);
    } else {
      travel.likes = travel.likes.filter(
        (userId) => userId !== req.user._id.toString()
      );
    }

    const updatedTravel = await TravelModel.findByIdAndUpdate(
      id,
      { likes: travel.likes },
      { new: true }
    );

    if (!updatedTravel) {
      return next(new ErrorHandler('Failed to update travel', 500));
    }

    res.status(200).json({ success: true, data: updatedTravel });
  }
);
// export const commentTravel = tryCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const travelId = req.params.id;
//     const data = req.body;

//     const travel = (await TravelModel.findById(travelId)) as any;

//     travel?.comments.push(data);

//     const updatedTravel = await TravelModel.findByIdAndUpdate(
//       travelId,
//       travel,
//       { new: true }
//     );

//     res.status(200).json({ success: true, data: updatedTravel });
//   }
// );

export const commentTravel = tryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const travelId = req.params.id;
    const { value } = req.body; // Assuming you have a 'text' field in the comment data
    const userId = req.user?.id; // Assuming you have a user ID available in req.user

    // Create a new comment object
    const newComment = {
      value,
      user: userId,
      createdAt: new Date(),
    };
    const travel = await TravelModel.findById(travelId);

    // If travel not found
    if (!travel) {
      return next(new ErrorHandler('Travel not found', 500));
    }

    // Push the new comment to the comments array
    travel.comments.push(newComment);

    // Save the updated travel document
    const updatedTravel = await travel.save();

    res.status(200).json({ success: true, data: updatedTravel });
  }
);

// export const commentTravel = tryCatch(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const travelId = req.params.id;
//     const { value } = req.body; // Assuming you have a 'text' field in the comment data
//     const userId = req.user?.id; // Assuming you have a user ID available in req.user

//     // Create a new comment object
//     const newComment = {
//       value,
//       user: userId,
//       createdAt: new Date(),
//     };

//     try {
//       const travel = await TravelModel.findById(travelId);

//       // If travel not found
//       if (!travel) {
//         return res.status(404).json({
//           success: false,
//           message: 'Travel not found',
//         });
//       }

//       // Push the new comment to the comments array
//       travel.comments.push(newComment);

//       // Save the updated travel document
//       const updatedTravel = await travel.save();

//       res.status(200).json({ success: true, data: updatedTravel });
//     } catch (error) {
//       next(error); // Pass the error to the next middleware (error handling middleware)
//     }
//   }
// );
