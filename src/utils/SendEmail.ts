import { Resend } from "resend";
import GreetingEmail from "../../Emails/greetingEmail";
import PassResetEmail from "../../Emails/passResetEmail";

const apiKey =
  process.env.RESEND_API_KEY || "re_HA8skvjy_DsBmtSAGLHE4dWZoaPrvcgd8";
const resend = new Resend(apiKey);

export async function SendGreetingEmail(name: string, email: string) {
  try {
    const result = await resend.emails.send({
      from: process.env.OwnerEmail || "onboarding@resend.dev", // Ensure this is a valid email
      to: process.env.OwnerEmail || "onboarding@resend.dev",
      subject: "Welcome to CodeCafe",
      react: GreetingEmail({ name, email }), // Ensure correct property for HTML content
    });

    console.log("Greeting email sent:", result);

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Error sending greeting email:", error);
    return {
      success: false,
      error: error.message || "Unknown error sending email",
    };
  }
}

export async function SendPassResetEmail(resetToken: string, email: string) {
  try {
    const result = await resend.emails.send({
      from: process.env.OwnerEmail || "admin@codecafe.com", // Ensure this is a valid email
      to: email,
      subject: "Reset Password",
      react: PassResetEmail({ email, token: resetToken }), // Ensure correct property for HTML content
    });

    console.log("Password reset email sent:", result);

    return {
      success: true,
      message: "Email sent successfully",
    };
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return {
      success: false,
      error: error.message || "Unknown error sending email",
    };
  }
}
