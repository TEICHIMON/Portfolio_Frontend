// DarkModeToggle.jsx
"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
const DarkModeToggle: React.FC = () => {
  const { toggle, mode } =
    useContext(ThemeContext);
  return (
    <div
      className="w-12 h-8 border-2 border-[#53c28b70] rounded-lg flex items-center justify-between p-[2px] relative cursor-pointer"
      onClick={toggle}
    >
      <div className="text-xs">🌙</div>
      <div className="text-xs">🔆</div>
      <div
        className={`w-3.5 h-3.5 bg-[#53c28b] rounded-full absolute transition-all duration-300 ${
          mode === "light"
            ? "left-[2px]"
            : "right-[2px]"
        }`}
      />
    </div>
  );
};

export default DarkModeToggle;
