// Import necessary modules and functions
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { Session, getServerSession } from "next-auth";
import { z } from "zod";
import {
  UsernameValidation,
  EmailValidation,
  RoleValidation,
} from "@/schemas/user.schema";

const UserUpdatingSchema = z.object({
  username: UsernameValidation,
  email: EmailValidation,
  password: z
    .string()
    .min(8)
    .regex(/[a-zA-Z0-9@#$%^&*!]/),

  role: RoleValidation,
});

// Ensure database connection

// Check authentication and authorization
async function checkAuthAndAuthorization(
  session: Session | null,
  userId: string
) {
  if (!session || !session.user) {
    return { error: "Unauthorized", status: 401 };
  }

  if (session.user.role !== "admin" && session.user._id !== userId) {
    return {
      error: "Access restricted to admin users or user itself",
      status: 401,
    };
  }

  return true;
}

// Fetch user by ID
async function fetchUserById(userId: string) {
  return await UserModel.findById(userId);
}

// Handle GET request
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const authResult = await checkAuthAndAuthorization(session, params.userId);

    if (authResult !== true) {
      return NextResponse.json(authResult, { status: authResult.status });
    }

    const user = await fetchUserById(params.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Handle PUT request
export async function PUT(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const authResult = await checkAuthAndAuthorization(session, params.userId);

    if (authResult !== true) {
      return NextResponse.json(authResult, { status: authResult.status });
    }

    const user = await fetchUserById(params.userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const data = await req.json();

    // Validate input data against schema
    const validatedData = UserUpdatingSchema.parse(data);

    // Update user fields
    user.username = validatedData.username;
    user.email = validatedData.email;
    user.password = validatedData.password;

    // Only allow role update by admin
    if (validatedData.role && session?.user.role === "admin") {
      user.role = validatedData.role;
    }

    const updatedUser = await user.save(); // Save updated user

    if (!updatedUser) {
      return NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
