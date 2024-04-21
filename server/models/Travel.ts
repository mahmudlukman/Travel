import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from "../models/User";

export interface IComment {
  user: IUser;
  comment: string;
  commentReplies?: IComment[];
}

const CommentSchema = new Schema<IComment>({
  user: Object,
  comment: String,
  commentReplies: [Object]
})

export interface ITravel extends Document {
  title: string;
  message: string;
  tags: string[];
  image: {
    public_id: string;
    url: string;
  };
  likes: string[];
  comments: IComment[];
}

const TravelSchema: Schema<ITravel> = new mongoose.Schema(
  {
    title: String,
    message: String,
    tags: [String],
    image: {
      public_id: String,
      url: String,
    },
    likes: { type: [String], default: [] },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

const TravelModel: Model<ITravel> = mongoose.model<ITravel>(
  'Travel',
  TravelSchema
);

export default TravelModel;
