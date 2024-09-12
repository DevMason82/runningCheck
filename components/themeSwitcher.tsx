"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { BsFillLightbulbFill, BsFillLightbulbOffFill } from "react-icons/bs";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 클라이언트에서만 작동하도록 설정
  useEffect(() => setMounted(true), []);

  // 마운트 되기 전에는 아무 것도 렌더링하지 않음
  if (!mounted) return null;

  // 현재 테마에 따라 아이콘을 전환
  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      variant="light"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <BsFillLightbulbOffFill /> : <BsFillLightbulbFill />}
    </Button>
  );
}
