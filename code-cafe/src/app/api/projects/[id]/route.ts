import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import Project from "../../../../models/Project";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === "GET") {
    const project = await Project.findById(id);
    res.status(200).json(project);
  } else if (req.method === "PUT") {
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(project);
  } else if (req.method === "DELETE") {
    await Project.findByIdAndDelete(id);
    res.status(204).end();
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
