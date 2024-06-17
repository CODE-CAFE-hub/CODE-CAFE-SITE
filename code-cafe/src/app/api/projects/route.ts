// Import necessary modules and functions
import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/projects.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextResponse, NextRequest } from "next/server";
import { ProjectSchema } from "@/schemas/project.schema";
1;
// GET function
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid page number" },
        { status: 400 }
      );
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "Invalid limit value" },
        { status: 400 }
      );
    }

    await dbConnect();

    const skipCount = (page - 1) * limit;
    const projects = await ProjectModel.find().skip(skipCount).limit(limit);

    if (!projects || projects.length === 0) {
      return NextResponse.json({ error: "No projects found" }, { status: 404 });
    }

    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST function
export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const currentUser = session?.user;

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        { error: "Access restricted to admin users only" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const validatedData = ProjectSchema.parse(data);

    const project = await ProjectModel.create({
      name: validatedData.name,
      description: validatedData.description,
      status: validatedData.status,
      ownerId: currentUser._id,
    });

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: any) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
