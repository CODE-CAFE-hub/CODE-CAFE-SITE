import React from "react";

interface PassResetEmailProps {
  email: string;
  token: string;
}

export default function PassResetEmail({ email, token }: PassResetEmailProps) {
  const resetLink = `https://codecafe.com/reset-password?token=${token}&id=${email}`;

  return (
    <div>
      <h1>Password Reset Request</h1>
      <p>
        We received a request to reset the password for the account associated
        with this email address ({email}).
      </p>
      <p>
        If you made this request, please click the link below to reset your
        password:
      </p>
      <p>
        <a href={resetLink} target="_blank" rel="noopener noreferrer">
          Reset Password
        </a>
      </p>
      <p>
        If you did not request a password reset, please ignore this email. Your
        password will remain unchanged.
      </p>
      <p>Thank you,</p>
      <p>The Code Cafe Team</p>
    </div>
  );
}
