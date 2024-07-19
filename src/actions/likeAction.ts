'use server'
import Like from "@/model/likeModel";
import { LikeType } from "@/types/indexType";
import { dbConnect } from "@/lib/dbConnect";
import { getUser } from "./userAction";
import { revalidatePath } from "next/cache";
import Post from "@/model/postModel";
import User from "@/model/userModel";



// Toggle Like
export const toggleLike = async ({ post }: LikeType) => {
    try {
      await dbConnect();
  
      const session = await getUser();
      if (!session) {
        console.log("User not found");
        return null;
      }
  
      const existingPost = await Post.findById(post);
      if (!existingPost) {
        console.log("Post not found");
        return null;
      }
  
      // Check if the user has already liked the post
      const existingLike = await Like.findOne({ user: session.id, post: post });
  
      if (existingLike) {
        // If like exists, remove it (dislike)
        await Like.findByIdAndDelete(existingLike._id);
        // await User.findByIdAndUpdate(session.id, { $pull: { likedPosts: post } });
        await Post.findByIdAndUpdate(post, { $pull: { likes: session.id } });
        console.log("Disliked");
        revalidatePath('/');
        revalidatePath('/[id]');
        return JSON.parse(JSON.stringify(existingLike));
      } else {
        // If like doesn't exist, create it (like)
        const newLike = await Like.create({ user: session.id, post: post });
        await newLike.save();
        // await User.findByIdAndUpdate(session.id, { $addToSet: { likedPosts: post } });
        await Post.findByIdAndUpdate(post, { $addToSet: { likes: session.id } });
        console.log("Liked");
        revalidatePath('/');
        revalidatePath('/[id]');
        return JSON.parse(JSON.stringify(newLike));
      }
    } catch (error) {
      console.log("Failed to toggle like", error);
    }
  };

export const getLikesPostByUser = async (user: string) => {
    try {
        await dbConnect();
        const likes = await Like.find({ user });
        return JSON.parse(JSON.stringify(likes));
    } catch (error) {
        throw new Error("Failed to fetch likes");
    }
};