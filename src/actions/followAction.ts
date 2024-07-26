"use server";
import User from "@/model/userModel";
import { getUser } from "./userAction";
import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/dbConnect";

export const toggleFollow = async ({ user }: { user: string }) => {
  try {
    await dbConnect();

    const session = await getUser();

    if (!session) {
      console.log("session not found");
      return null;
    }

    const alreadyFollowed = await User.findOne({
      _id: session.id,
      following: user,
    });

    if (alreadyFollowed) {
      await User.findByIdAndUpdate(
        session.id,
        { $pull: { following: user } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        user,
        { $pull: { followers: session.id } },
        { new: true }
      );
      
      revalidatePath('/');
      revalidatePath('/[id]');
      return true;
    } else {
        await User.findByIdAndUpdate(
            session.id,
            { $addToSet: { following: user } },
            { new: true }
          );
      await User.findByIdAndUpdate(
        user,
        { $addToSet: { followers: session.id } },
        { new: true }
      );

      revalidatePath('/');
      revalidatePath('/[id]');

      return true;

    }
  } catch (error) {
    console.log("error while follow", error);
  }
};
