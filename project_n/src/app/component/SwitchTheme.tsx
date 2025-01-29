"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const SwitchTheme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true));

  if (!mounted) {
    return null;
  }

  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
    className="relative flex text-lg items-center justify-center w-7 h-7  hover:text-gray-500 hover:cursor-pointer"
    onClick={handleSwitchTheme}
  >
    <Sun className="absolute  w-7 h-7 scale-0 dark:scale-100 transition-transform duration-300" />
    <Moon className="absolute w-7 h-7 scale-100 dark:scale-0 transition-transform duration-300" />
  </button>
  );
};

export default SwitchTheme;
