'use server'
import mongoose, { Schema, Document } from "mongoose";

interface PostType extends Document {
  title: string;
  image: string[];
  description: string;
  category: string;
  tags: string[];
  views: number;
  user: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  bookmarks: mongoose.Types.ObjectId[]; // Add bookmarks field
}

const postSchema = new Schema<PostType>({
  title: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
    }
  ],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [], // Set default value for tags as an empty array
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    }
  ],
  bookmarks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bookmark",
    }
  ],
},
{ timestamps: true });

const Post = mongoose.models?.Post || mongoose.model<PostType>("Post", postSchema);

export default Post;
