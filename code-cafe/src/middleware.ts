import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req: req });
  const url = req.nextUrl;

  if (token && url.pathname.startsWith("/auth/:path*")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/auth/:path*", "/", "/dashboard/:path*,/:path*"],
};
