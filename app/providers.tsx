"use client";

import { NextUIProvider } from "@nextui-org/react";
// import { useRouter } from "next/navigation";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useRouter } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <NextUIProvider navigate={router.push}>
      {children}
      <ProgressBar
        height="4px"
        // color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </NextUIProvider>
  );
}
