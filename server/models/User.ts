require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  travels: Array<{ travelId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    travels: [
      {
        travelId: String
      }
    ]
  },
  { timestamps: true }
);

// Hash Password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// sign access token
UserSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "7d",
  });
};

// compare password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel: Model<IUser> = mongoose.model("User", UserSchema);
export default UserModel;
