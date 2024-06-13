import dbConnect from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { UsernameValidation } from "@/schemas/user.schema";

// Define the schema for query validation
const UsernameQuerySchema = z.object({
  username: UsernameValidation,
});

// Define the GET handler for the request
export async function GET(request: NextRequest) {
  // Connect to the database
  await dbConnect();

  try {
    // Parse the request URL to get query parameters
    const { searchParams } = new URL(request.url);
    const queryparams = {
      username: searchParams.get("username"),
    };

    // Validate query parameters
    const result = UsernameQuerySchema.safeParse(queryparams);
    console.log(result);

    if (!result.success) {
      // Format validation errors
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json({ error: usernameErrors }, { status: 400 });
    }

    const { username } = result.data;

    // Check if the username already exists
    const user = await User.findOne({ username });
    if (user) {
      return NextResponse.json(
        { error: "Username is already taken" },
        { status: 400 }
      );
    }

    // Respond with success if username is unique
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error checking if username is unique:", error);
    return NextResponse.json(
      { error: "Error checking if username is unique" },
      { status: 500 }
    );
  }
}
