"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // it runs only once - 페이지 렌더링 뙜을때 한번만 렌더링 - hydration error 피하기
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue="theme">
      <TabsList className="border dark:border-neutral-800 dark:bg-[#030303]">
        <TabsTrigger value="light">
          <SunIcon className="h-[1.2rem] w-[1.2rem]" onClick={() => setTheme("light")} />
        </TabsTrigger>
        <TabsTrigger value="dark">
          <MoonIcon
            className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0"
            onClick={() => setTheme("dark")}
          />
        </TabsTrigger>
        <TabsTrigger value="system">
          <DesktopIcon className="h-[1.2rem] w-[1.2rem]" onClick={() => setTheme("system")} />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
