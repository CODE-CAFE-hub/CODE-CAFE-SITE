// Dashboard.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import "../../styles/global.css";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

interface DashboardProps {
  username: string;
}

const Dashboard: React.FC<DashboardProps> = async () => {
  const { getUser } = getKindeServerSession();
  const username = await getUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">Hello, {username?.email}!</h1>
      <p className="text-lg">Welcome to your dashboard.</p>
      <LogoutLink className="mt-4 px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition">
        logout
      </LogoutLink>
    </div>
  );
};

export default Dashboard;
