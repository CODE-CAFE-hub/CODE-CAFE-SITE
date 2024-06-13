import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { username: credentials.identifier.username },
              { email: credentials.identifier.email },
            ],
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut",
    newUser: "/auth/signUp",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
};
