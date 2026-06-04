"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./nav.css";

export default function NavAdmin() {
  const pathname = usePathname();
  const [darkMode, setdarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

useEffect(() => {
  document.body.classList.toggle("dark", darkMode);
  document.body.classList.toggle("light", !darkMode);

  localStorage.setItem(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);

  const linkClass = (path: string) =>
    `relative px-3 py-2 transition-all duration-300
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-full after:bg-white
     after:rounded-full after:transition-transform after:duration-300
     after:origin-left
     ${
       pathname === path
         ? "after:scale-x-100"
         : "after:scale-x-0 hover:after:scale-x-100"
     }`;

  return (
    <div className="navbar flex items-center justify-between px-4">
      <div className="navleft">
        <span className="text">SIPMO</span>
      </div>

      {/* MENU */}
      <div className={`navright flex gap-4 ${menuOpen ? "open" : ""}`}>
        <Link href="/admin" className={linkClass("/admin")}>
          Home
        </Link>
        <Link href="/about" className={linkClass("/about")}>
          About
        </Link>
      </div>

      {/* HAMBURGER */}
      <button
        className="hamburger md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "X" : "☰"}
      </button>

      {/* DARK MODE */}
      <button
        onClick={() => setdarkMode(!darkMode)}
        className="toggle-btn ml-2"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}