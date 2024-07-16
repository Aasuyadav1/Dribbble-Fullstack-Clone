"use server";
import { dbConnect } from "@/lib/dbConnect";
import Bookmark from "@/model/bookmarkModel";
import User from "@/model/userModel";
import Post from "@/model/postModel";
import { getUser } from "./userAction";
import { revalidatePath } from "next/cache";

export const toggleBookmark = async ({ post }: { post: string }) => {
  try {
    await dbConnect();

    const session = await getUser();

    if (!session) {
      console.log("session not found");
      return null;
    }

    const existingBookmark = await Bookmark.findOne({
      user: session.id,
      post: post,
    });

    if (existingBookmark) {
      // If like exists, remove it (dislike)
      await Bookmark.findByIdAndDelete(existingBookmark._id);
      await Post.findByIdAndUpdate(post, { $pull: { bookmarks: session.id } });
      await User.findByIdAndUpdate(session.id, { $pull: { bookmarks: post } });
      revalidatePath('/');
      revalidatePath('/[id]');
      return JSON.parse(JSON.stringify(existingBookmark));

    } else {
      // If like doesn't exist, create it (like)
      const newBookmark = await Bookmark.create({
        user: session.id,
        post: post,
      });
      await newBookmark.save();
      await Post.findByIdAndUpdate(post, {
        $addToSet: { bookmarks: session.id },
      });
      await User.findByIdAndUpdate(session.id, {
        $addToSet: { bookmarks: post },
      });
      revalidatePath('/');
      revalidatePath('/[id]');
    }
  } catch (error) {
    console.log("Failed to toggle bookmark", error);
  }
};
