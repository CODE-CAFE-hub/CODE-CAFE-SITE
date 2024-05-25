import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { NextRequest } from "next/server";

// Handler for processing contact form submission
export async function POST(request: NextRequest) {
  try {
    // Extract form data from request body
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        message: "Please provide all required fields: name, email, and message",
      });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create transporter for sending email (replace with your email provider)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Construct email options
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact form submission from ${name}`,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Log successful email sending
    console.log("Email sent successfully");

    // Return success response
    return NextResponse.json({
      success: true,
      message:
        "Your message has been sent successfully. We will get back to you soon.",
    });
  } catch (error) {
    // Log error
    console.error("Failed to send email:", error);

    // Return error response if email sending fails
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Function to validate email format
function isValidEmail(email: string) {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
