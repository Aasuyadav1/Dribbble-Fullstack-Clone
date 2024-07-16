'use server'
import { dbConnect } from "@/lib/dbConnect";
import Comment from "@/model/commentModel";
import { CommentType } from "@/types/indexType";
import Post from "@/model/postModel";
import { getUser } from "./userAction";
import { revalidatePath } from "next/cache";

export const createComment = async ({postId, content}: {postId: string; content: string}) => {
    try {
        await dbConnect();
        const userid = await getUser();
        if(!userid) throw new Error("User not found");
        const comment = {
            content,
            post: postId,
            user: userid?.id,
        }
        const newComment = await Comment.create(comment);
        await Post.findByIdAndUpdate(comment.post, { $addToSet: { comments: newComment._id } });
        await newComment.save();
        revalidatePath('/[id]');
        revalidatePath('/');
        revalidatePath('/post/[id]');
        return JSON.parse(JSON.stringify(newComment));
    } catch (error) {
        // throw new Error("Failed to create comment");
        console.log(error);
    }
}

export const getCommentsByPostId = async (postId: string) => {
    try {
        await dbConnect();
        const comments = await Comment.find({ post: postId }).populate("user", "username image ");
        return JSON.parse(JSON.stringify(comments));
    } catch (error) {
        throw new Error("Failed to fetch comments");
    }
}

export const deleteComment = async ({id}: {id:string}) => {
    try {
        await dbConnect();
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) throw new Error("Comment not found");
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
        revalidatePath('/[id]');
        revalidatePath('/');
        revalidatePath('/post/[id]');
        return JSON.parse(JSON.stringify(comment));
    } catch (error) {
        throw new Error(`Failed to delete comment with ID: ${id}`);
    }
}

export const updateComment = async ({id, postid, content} : {id: string; postid: string; content: string}) => {
    try {
        await dbConnect();
        const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true });
        const post = await Post.findById(postid);
        // if (!post) throw new Error("Post not found");
        // await post.comments.findByIdAndUpdate(comment._id, { content });
        if (!comment) throw new Error("Comment not found");
        revalidatePath('/[id]');
        revalidatePath('/');
        revalidatePath('/post/[id]');
        return JSON.parse(JSON.stringify(comment));
    } catch (error) {
        throw new Error(`Failed to update comment with ID: ${id}`);
    }
}