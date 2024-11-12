"use client";
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next-nprogress-bar";

const SigninBtn = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // 세션이 존재할 경우 홈 페이지로 리다이렉트
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  // if (session && session.user) {
  //   return (
  //     <Button
  //       className="px-12 py-4 border rounded-xl bg-red-300"
  //       onPress={() => signOut()}
  //     >
  //       {session.user.name}님 Log Out
  //     </Button>
  //   );
  // }

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        className="w-full transform rounded-md bg-yellow-400 tracking-wide text-default font-semibold"
        onPress={() => signIn("kakao", { redirect: true, callbackUrl: "/" })}
        isDisabled={!session}
      >
        KAKAO login
      </Button>

      <Button
        className="w-full transform rounded-md bg-green-400 tracking-wide text-default font-semibold"
        onPress={() => signIn("naver", { redirect: true, callbackUrl: "/" })}
        isDisabled={!session}
      >
        NAVER login
      </Button>
    </div>
  );
};

export default SigninBtn;
