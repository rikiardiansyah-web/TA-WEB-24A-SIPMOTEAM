"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./nav.css";

type Warga = {
  nik: string;
  nama: string;
  username?: string;
  email?: string;
  fotoProfil?: string;
};

export default function NavAdmin() {
  const pathname = usePathname();

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState<Warga | null>(() => {
    if (typeof window === "undefined") return null;
    return JSON.parse(localStorage.getItem("user") || "null");
  });

  useEffect(() => {
  document.body.classList.toggle(
    "dark",
    darkMode
  );

  document.body.classList.toggle(
    "light",
    !darkMode
  );

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

  const inisial =
    user?.nama
      ?.split(" ")
      .map((item: string) => item[0])
      .join("")
      .toUpperCase() || "?";

  return (
    <div className="navbar flex items-center justify-between px-4">

      {/* LOGO */}
      <div className="navleft">
        <span className="text">SIPMO</span>
      </div>

      {/* MENU */}
      <div
        className={`navright flex gap-4 ${
          menuOpen ? "open" : ""
        }`}
      >
        <Link
          href="/"
          className={linkClass("/")}
        >
          Home
        </Link>

        <Link
          href="/berita"
          className={linkClass("/berita")}
        >
          Berita
        </Link>
      </div>

      {/* HAMBURGER */}
      <button
        className="hamburger md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "X" : "☰"}
      </button>

      {/* KANAN */}
      <div className="flex items-center gap-3">

        {/* DARK MODE */}
          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="toggle-btn"
          >
            {darkMode
              ? "☀ Light"
              : "☾ Dark"}
          </button>

        {/* FOTO PROFIL */}
        <Link href="/profile">

          {user?.fotoProfil ? (
            <img
              src={user.fotoProfil}
              alt="Profile"
              className="
                w-10
                h-10
                rounded-full
                object-cover
                border-2
                border-cyan-400
              "
            />
          ) : (
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-cyan-600
                text-white
                flex
                items-center
                justify-center
                font-bold
                cursor-pointer
              "
            >
              {inisial}
            </div>
          )}

        </Link>

      </div>
    </div>
  );
}