import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "@/model/userModel";
import { dbConnect } from "./dbConnect";
import { NextAuthConfig } from "next-auth";

export const options: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
        try {
          
          await dbConnect();
  
          const sessionUser = await User.findOne({ email: session?.user?.email });
  
          if (sessionUser) {
            session.user.id = sessionUser?._id;
            session.user.slug = sessionUser?.slug;
          }
  
          
          return session;
        } catch (error) {
         console.log(error);
         return session
        }
      },
    async signIn({ profile, account }: any) {
      try {

        await dbConnect(); 
        const { name, email, image } = profile;


        // Check if the account provider is Google or GitHub
        if (account?.provider === "google" || account?.provider === "github") {

          const existingUser = await User.findOne({ email });

          if (!existingUser) {

            const slug = name.trim().toLowerCase().replace(/\s+/g, "");

            await User.create({ username: name, email, image, slug });
          }
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
    // pages: {
    //     // add sign page url
    //   signIn: '/signin',
    // },
  secret: process.env.NEXTAUTH_SECRET,
};
