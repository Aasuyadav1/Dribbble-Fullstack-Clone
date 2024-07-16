'use server';
import mongoose, { Schema, Document } from "mongoose";

interface userType extends Document {
  username: string;
  email: string;
  slug: string;
  password: string;
  image: string;
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[];
  views: number;
  color: string;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        }
    ],
    views: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model<userType>("User", UserSchema);

export default User;
