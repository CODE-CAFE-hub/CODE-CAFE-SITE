import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/db";
import Message from "../../../../models/Message";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { ownerId } = req.query;
  if (req.method === "POST") {
    const { message, userId } = req.body;
    const newMessage = new Message({ content: message, ownerId, userId });
    await newMessage.save();
    res.status(200).json({ message: "Message sent successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
