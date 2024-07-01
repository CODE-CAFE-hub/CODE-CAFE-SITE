import React from "react";

interface GreetingEmailProps {
  name: string;
  email: string;
}

export default function GreetingEmail({ name, email }: GreetingEmailProps) {
  return (
    <div>
      <h1>Welcome to Code Cafe, {name}!</h1>
      <p>
        We're excited to have you join our community. Below are your
        registration details:
      </p>
      <ul>
        <li>
          <strong>Name:</strong> {name}
        </li>
        <li>
          <strong>Email:</strong> {email}
        </li>
      </ul>
      <p>
        At Code Cafe, you can explore various IT projects, rate them, and
        connect with project owners for further collaboration.
      </p>
      <p>
        If you have any questions or need assistance, feel free to reach out to
        us.
      </p>
      <p>Happy Coding!</p>
      <p>The Code Cafe Team</p>
    </div>
  );
}
