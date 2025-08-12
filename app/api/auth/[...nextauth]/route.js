import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import mongoose from "mongoose"
import User from "@/models/User"
import Payment from "@/models/Payment"
import dbConnect from "@/utils/dbConnect"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github" || account.provider === "google") {
        try {
          await dbConnect();
          const existingUser = await User.findOne({ email: user.email });
  
          if (!existingUser) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              username: user.email.split("@")[0],
            });
            await newUser.save();
          }
  
          return true;
        } catch (err) {
          console.error("SignIn error:", err);
          return false;
        }
      }
  
      return true;
    }
  }
  
  
})

export { handler as GET, handler as POST }
