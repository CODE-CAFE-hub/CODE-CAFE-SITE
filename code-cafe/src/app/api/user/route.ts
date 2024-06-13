import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { getToken } from "next-auth/jwt";

// Define the GET handler for the request
export async function GET(req: NextRequest) {
  // Connect to the database
  await dbConnect();
  try {
    const token = await getToken({ req: req });
    const { searchParams } = new URL(req.url);

    if (!token) {
      return NextResponse.json(
        { error: "you are unauthorized user" },
        { status: 401 }
      );
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "error geting users" }, { status: 500 });
  }
}
