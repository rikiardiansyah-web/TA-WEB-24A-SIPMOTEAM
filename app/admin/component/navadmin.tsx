"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import "./navadmin.css";

type Admin = {
  id: number;
  username: string;
  nama: string;
  email?: string;
  noHp?: string;
  fotoProfil?: string;
  role: string;
  aktif: boolean;
};

export default function NavAdmin({
  adminProfile,
}: {
  adminProfile: Admin | null;
}) {
  const pathname = usePathname();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [menu, setMenuState] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // sync theme global (PAKAI BODYY BIAR SAMA DENGAN USER)
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.body.classList.toggle("light", !darkMode);

    localStorage.setItem("theme", darkMode ? "dark" : "light");
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

  function setMenu(name: string) {
    // set currently selected submenu/menu name
    setMenuState(name);
  }

  return (
    <div className="navbar">

      <div className="navleft">
        <span className="text">SIPMO ADMIN</span>
      </div>
<div className="navright">
<Link
  href="/admin"
  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#03618f] transition"
>
  Profil
</Link>

<button
  onClick={() => {
    setMenu("pembangunan");
    setOpen(false);
  }}
  className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#03618f] transition"
>
  Profil
</button>

{/* AVATAR ADMIN - FIXED SIZE */}
<div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 shrink-0">
  {adminProfile?.fotoProfil ? (
    <img
      src={adminProfile.fotoProfil}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-cyan-700 text-white text-xs font-bold">
      {adminProfile?.nama?.[0] || "A"}
    </div>
  )}
</div>

<button
  onClick={() => setDarkMode(!darkMode)}
  className="toggle-btn"
>
  {darkMode ? "☀ Light" : "☾ Dark"}
</button>
    </div>
    </div>
  );
}