import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import dbConnect from "../../../lib/db";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (user) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      session.user.id = user.id;
      return session;
    },
    async signIn(user) {
      await dbConnect();
      user.lastLogin = new Date();
      await user.save();
      return true;
    },
  },
});
