'use server'
import mongoose, { Schema, Document } from "mongoose";

interface BookmarkType extends Document {
  user: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
}

const bookmarkSchema = new Schema<BookmarkType>({
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

const Bookmark = mongoose.models?.Bookmark || mongoose.model<BookmarkType>("Bookmark", bookmarkSchema);

export default Bookmark;
