"use client";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Singed in as {session.user.email} <br />
        <button
          className="bg-orange-500 text-white p-3 m-5 rounded "
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="bg-teal-500 p-3 m-5 rounded text-white "
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
