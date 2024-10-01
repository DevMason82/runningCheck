"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

const SigninBtn = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Button
        className="px-12 py-4 border rounded-xl bg-red-300"
        onPress={() => signOut()}
      >
        {session.user.name}님 Log Out
      </Button>
    );
  }

  return (
    <Button
      className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
      onPress={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}
    >
      kakao login
    </Button>
  );
};

export default SigninBtn;
