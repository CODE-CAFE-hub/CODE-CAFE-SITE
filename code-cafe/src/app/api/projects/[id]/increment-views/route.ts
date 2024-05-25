// pages/api/projects/[id]/increment-views.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/lib/dbConnect";
import Project from "@/models/project";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end(); // Method Not Allowed
    return;
  }

  await connectDb();

  const { id } = req.query;

  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    // Ensure TypeScript recognizes the method
    if (project.incrementViews) {
      await project.incrementViews();
      res
        .status(200)
        .json({ message: "Project views incremented", views: project.views });
    } else {
      res
        .status(500)
        .json({ message: "Increment view method not found on project" });
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
