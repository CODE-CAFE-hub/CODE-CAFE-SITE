import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import Visit from "../../models/Visit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { timestamp } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const visit = new Visit({ ip, timestamp: new Date(timestamp) });
    await visit.save();
    res.status(200).json({ message: "Visit tracked successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
