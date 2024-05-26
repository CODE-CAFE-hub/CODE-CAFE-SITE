"use client";
import "../styles/global.css";
import React from "react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

const PageName: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <div className="space-y-4">
        <LoginLink className="px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition">
          Sign in
        </LoginLink>
        <RegisterLink className="px-4 py-2 border border-blue-500 rounded text-blue-500 hover:bg-blue-500 hover:text-gray-900 transition">
          Sign up
        </RegisterLink>
      </div>

      {/* Page content goes here */}
      <h1 className="mt-8 text-2xl">Your Page Content</h1>
    </div>
  );
};

export default PageName;
