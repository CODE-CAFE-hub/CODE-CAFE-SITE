// pages/api/projects/[id]/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/lib/dbConnect";
import Project from "@/models/project";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDb();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const project = await Project.findById(id);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.status(200).json(project);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else if (req.method === "PUT") {
    const { title, description, pictureUrls, tags } = req.body;

    try {
      const project = await Project.findById(id);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }

      project.title = title || project.title;
      project.description = description || project.description;
      project.pictureUrls = pictureUrls || project.pictureUrls;
      project.tags = tags || project.tags;

      await project.save();
      res.status(200).json(project);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: "Error updating project", error: error.message });
      } else {
        res.status(400).json({ message: "Error updating project" });
      }
    }
  } else if (req.method === "DELETE") {
    try {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
      }
      res.status(200).json({ message: "Project deleted" });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Internal server error", error: error.message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
