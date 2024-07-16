"use server";
import { auth } from "../../auth";// this function have a session
import { dbConnect } from "@/lib/dbConnect";
import User from "@/model/userModel";



interface SessionType {
    user: {
        image: string | null;
        name: string | null;
        slug: string;
        email: string;
        id: string;
    };
}

export const getUser = async (): Promise<SessionType["user"] | null> => {
  try {
    const session = await auth();

    if (!session) {
      return null;
    }

    console.log(JSON.stringify(session.user));

    return JSON.parse(JSON.stringify(session.user));
  } catch (error) {
    console.log("session error", error);
    return null;
  }
};

export const getUserBySlug = async (slug : string) => {
  try {
    await dbConnect();

    const user = await User.findOne({ slug: { $regex: `^${slug}$`, $options: 'i' } });

    if(!user){
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("user by name getting error", error);
  }
}

export const getUserById = async (id : string) => {
  try {
    await dbConnect();

    const user = await User.findById(id);

    if(!user){
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log("user by id getting error", error);
  }
}
