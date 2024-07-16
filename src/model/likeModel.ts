'use server'
import mongoose, { Schema, Document } from "mongoose";

interface LikeType extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const likeSchema = new Schema<LikeType>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
},
{ timestamps: true });

const Like = mongoose.models?.Like || mongoose.model<LikeType>("Like", likeSchema);

export default Like;
