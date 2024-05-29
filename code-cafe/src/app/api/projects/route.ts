import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import Project from "../../../models/Project";
import { log } from "console";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "GET") {
    const projects = await Project.find();
    log("hello projects");
    res.status(200).json(projects);
  } else if (req.method === "POST") {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
