import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/projects.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { ProjectSchema } from "@/schemas/project.schema";

// Error handler function
const errorHandler = (error: any) => {
  console.error("Error:", error);
  return NextResponse.json(
    {
      error:
        error.message ||
        "Something went wrong while processing request to projects",
    },
    { status: error.status || 500 }
  );
};

// Function to check if user is authorized
const checkAuthorization = (currentUser: any): NextResponse | undefined => {
  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (currentUser.role !== "admin") {
    return NextResponse.json(
      { error: "Access restricted to admin users only" },
      { status: 401 }
    );
  }
};

// Function to validate and sanitize input data against ProjectSchema
const validateProjectData = async (data: any): Promise<any> => {
  try {
    return ProjectSchema.parse(data);
  } catch (error: any) {
    throw new Error(`Validation failed: ${error.errors}`);
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  await dbConnect();
  try {
    const project = await ProjectModel.findById(params.projectId);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error: any) {
    return errorHandler(error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const currentUser = session?.user;

    const authResponse = checkAuthorization(currentUser);
    if (authResponse) return authResponse;

    // Validate incoming data against ProjectSchema
    const data = await req.json();
    const validatedData = await validateProjectData(data);

    // Create new project
    const project = await ProjectModel.create({
      name: validatedData.name,
      description: validatedData.description,
      status: validatedData.status || "inProgress", // Default status if not provided
      ownerId: currentUser._id,
    });

    return NextResponse.json({ project }, { status: 201 }); // HTTP 201 Created
  } catch (error: any) {
    if (error.message.startsWith("Validation failed")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } }
) {
  await dbConnect();
  try {
    const session = await getServerSession(authOptions);
    const currentUser = session?.user;

    const authResponse = checkAuthorization(currentUser);
    if (authResponse) return authResponse;

    const project = await ProjectModel.findByIdAndDelete(params.projectId);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return errorHandler(error);
  }
}
