// Import necessary modules and functions
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/user.model";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse, NextRequest } from "next/server";

// Function to handle pagination and fetch users
async function fetchPaginatedUsers(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const users = await UserModel.find().skip(skip).limit(limit);
  return users;
}

// Function to handle errors and return appropriate responses
function handleErrorResponse(errorMessage: string, statusCode: number = 500) {
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}

// Function to check if user is authenticated and authorized
async function checkAuthAndAuthorization(session: Session | null) {
  if (!session || !session.user) {
    return handleErrorResponse("Unauthorized", 401);
  }

  if (session.user.role !== "admin") {
    return handleErrorResponse("Access restricted to admin users only", 401);
  }

  return true;
}

// Define GET function to handle HTTP GET requests
export async function GET(req: NextRequest) {
  try {
    // Extract query parameters from request URL
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1 if not provided
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default to limit 10 if not provided

    // Connect to database
    await dbConnect();

    // Get session information
    const session = await getServerSession(authOptions);

    // Check authentication and authorization
    const authResult = await checkAuthAndAuthorization(session);
    if (authResult !== true) {
      return authResult; // Return error response if not authenticated or authorized
    }

    // Fetch paginated users
    const users = await fetchPaginatedUsers(page, limit);

    // If no users found, return 404 error
    if (users.length === 0) {
      return handleErrorResponse("Users not found", 404);
    }

    // Return paginated response
    return NextResponse.json({ users, page, limit });
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching users:", error);
    return handleErrorResponse("Internal Server Error", 500);
  }
}

//to create user
