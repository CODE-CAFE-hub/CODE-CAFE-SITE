import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/db";
import ContactMessage from "../../../models/ContactMessage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  if (req.method === "POST") {
    const { name, email, message } = req.body;
    const contactMessage = new ContactMessage({ name, email, message });
    await contactMessage.save();
    res.status(200).json({ message: "Contact form submitted successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
