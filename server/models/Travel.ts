import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITravel extends Document {
  title: string;
  message: string;
  name: string;
  creator: string;
  tags: string[];
  image: {
    public_id: string;
    url: string;
  };
  likes: string[];
  comments: string[];
}

const TravelSchema: Schema<ITravel> = new mongoose.Schema(
  {
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    image: {
      public_id: String,
      url: String,
    },
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
  },
  { timestamps: true }
);

const TravelModel: Model<ITravel> = mongoose.model<ITravel>(
  'Travel',
  TravelSchema
);

export default TravelModel;
