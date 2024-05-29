import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/db";
import User from "../../../../models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { userId } = await req.json();
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { lastLogin: new Date() },
      { new: true }
    );
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 400 });
  }
}