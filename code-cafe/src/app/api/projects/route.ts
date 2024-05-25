// pages/api/projects/index.ts
import dbConnect from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import Project from "@/models/project";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "POST") {
    const { title, description, pictureUrls, tags } = req.body;

    try {
      const newProject = new Project({ title, description, pictureUrls, tags });
      await newProject.save();
      res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(400)
          .json({ message: "Error creating project", error: error.message });
      } else {
        res.status(400).json({ message: "Error creating project" });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
