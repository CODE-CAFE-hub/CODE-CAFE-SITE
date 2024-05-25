import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user";
import rateLimit from "../../../lib/rateLimit";
const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  await dbConnect();

  // Basic rate limiting
  const rateLimitCheck = rateLimit(req);
  if (!rateLimitCheck.success) {
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  }

  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Failed to fetch users", error });
      }
      break;

    case "POST":
      try {
        const {
          email,
          password,
          profilePicture,
          displayName,
          dob,
          timezone,
          mediaLinks,
          rating,
        } = req.body;

        if (!email || !password) {
          return res.status(400).json({
            success: false,
            message: "Email and password are required.",
          });
        }

        if (!validateEmail(email)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid email format." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          email,
          password: hashedPassword,
          profilePicture,
          displayName,
          dob,
          timezone,
          mediaLinks,
          rating,
        });
        await user.save();
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Failed to create user", error });
      }
      break;

    case "PUT":
      try {
        const {
          id,
          email,
          password,
          profilePicture,
          displayName,
          dob,
          timezone,
          mediaLinks,
          rating,
        } = req.body;

        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "User ID is required." });
        }

        if (email && !validateEmail(email)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid email format." });
        }

        const updateData: any = {
          profilePicture,
          displayName,
          dob,
          timezone,
          mediaLinks,
          rating,
        };

        if (email) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const user = await User.findByIdAndUpdate(id, updateData, {
          new: true,
        });
        if (!user) {
          return res
            .status(404)
            .json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Failed to update user", error });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;

        if (!id) {
          return res
            .status(400)
            .json({ success: false, message: "User ID is required." });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          return res
            .status(404)
            .json({ success: false, message: "User not found." });
        }
        res.status(200).json({ success: true, data: deletedUser });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Failed to delete user", error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res
        .status(405)
        .json({ success: false, message: `Method ${method} Not Allowed` });
      break;
  }
};

export default handler;
