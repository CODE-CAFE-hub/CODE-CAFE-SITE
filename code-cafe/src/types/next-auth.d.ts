import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    email?: string;
    username?: string;
    role?: string;
  }
  interface Session {
    user: {
      _id?: string;
      email?: string;
      username?: string;
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    email?: string;
    username?: string;
    role?: string;
  }
}
