'use server'
import mongoose, { Schema, Document } from "mongoose";

interface CommentType extends Document {
  content: string;
  post: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<CommentType>({
  content: {
    type: String,
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
},
{ timestamps: true });

const Comment = mongoose.models?.Comment || mongoose.model<CommentType>("Comment", commentSchema);

export default Comment;
