'use server'
import { dbConnect } from "@/lib/dbConnect";
import Post from "@/model/postModel";
import { getUser } from "./userAction";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import mongoose from "mongoose";

interface PostActionType {
        title: string;
        image: string;
        description: string;
        category?: string;
        tags?: string;
        id? : string;
}

export const createPost = async ({title, image, description, category, tags}: PostActionType ) => {
    try {

        const session = await getUser();

        if (!session) {
            console.log("session not found");
            return null;
        }

        const post = {
            title,
            image,
            description,
            category,
            tags,
            user: session.id,
        }
        
        await dbConnect();
        
        const newPost = await Post.create(post);

        await newPost.save();

        revalidatePath('/[id]');
        revalidatePath('/')

        return JSON.parse(JSON.stringify(newPost));
    } catch (error) {
        throw new Error("Failed to create post");
    }
};

export const getPostsByUser = async (user: string) => {
    try {
        await dbConnect();
        const posts = await Post.find({ user });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        throw new Error("Failed to fetch posts");
    }
};

export const getAllPosts = async () => {
    try {
        await dbConnect();


        const posts = await Post.find().populate("user");


        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        throw new Error("Failed to fetch posts");
    }
};

export const getPostsByCategory = async (category: string) => {
    try {
        await dbConnect();
        const posts = await Post.find({ category }).populate("user", "username image followers following");;
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        throw new Error(`Failed to fetch posts for category: ${category}`);
    }
};

export const incrementViews = async (id: string) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(`Invalid post ID: ${id}`);
        }

        await dbConnect();
        const post = await Post.findById(id);
        if (!post) throw new Error("Post not found");

        post.views = post.views + 1;
        await post.save();

        // revalidatePath('/[id]', 'page');
        // revalidatePath('/');
        // revalidatePath('/post/[id]', 'page');

        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        console.error(`Failed to increment views for post with ID: ${id}`, error);
        throw new Error(`Failed to increment views for post with ID: ${id}`);
    }
};

export const getPostById = async (id: string) => {
    try {
        await dbConnect();
        const post = await Post.findById(id).populate("user", "username image followers following");
        if (!post) throw new Error("Post not found");
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        throw new Error(`Failed to fetch post with ID: ${id}`);
    }
};

export const updatePost = async ({title, image, description, category, tags, id}: PostActionType) => {
    try {
        await dbConnect();

        const updData = {
            title,
            image,
            description,
            category,
            tags
        }

        const post = await Post.findByIdAndUpdate(id, updData, { new: true });
        if (!post) throw new Error("Post not found");
        revalidatePath('/[id]');
        revalidatePath('/');
        revalidatePath('/post/[id]');
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        throw new Error(`Failed to update post with ID: ${id}`);
    }
};

export const deletePost = async (id: string) => {
    try {
        await dbConnect();
       const post = await Post.findByIdAndDelete(id);
        if (!post) throw new Error("Post not found");
        revalidatePath('/[id]');
        revalidatePath('/');
        redirect('/');
        return JSON.parse(JSON.stringify(post));
    } catch (error) {
        throw new Error(`Failed to delete post with ID: ${id}`);
    }
};

export const searchPostsByTitle = async (query: string) => {
    try {
        await dbConnect();
        const posts = await Post.find({ title: { $regex: query, $options: 'i' } });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        throw new Error("Failed to search posts by title");
    }
};

export const searchPostsByColors = async (colors: string) => {
    try {
        await dbConnect();
        const posts = await Post.find({ colors: { $in: colors } });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        throw new Error("Failed to search posts by colors");
    }
}

export const searchPostsByTags = async (tags: string) => {
    try {
        await dbConnect();
        const posts = await Post.find({ tags: { $in: tags } });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        throw new Error("Failed to search posts by tags");
    }
}


// export const toogleLikePost = async ({post}: LikeType) => {
//     try {
//         const session = await getUser();
//         if (!session) {
//             console.log("session not found");
//             return null;
//         }

//         const like = {
//             user: session.id,
//             post
//         }

//         await dbConnect();

//         const existingLike = await Post.findOne({ user: session.id, post: post });


//     } catch (error) {
        
//     }
    
// }





