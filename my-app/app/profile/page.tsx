"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

type Warga = {
  nik: string;
  nama: string;
  username?: string;
  email?: string;
  password?: string;
  noTelepon?: string;
  alamat?: string;
  JenisKelamin?: string;
  status?: string;
  fotoProfil?: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<Warga | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userLogin = JSON.parse(
          localStorage.getItem("user") || "{}"
        );

        if (!userLogin.nik) {
          alert("Silakan login terlebih dahulu");
          window.location.href = "/login";
          return;
        }

        const res = await fetch(
          `/api/profile?nik=${userLogin.nik}`
        );

        const data = await res.json();

        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    

    loadProfile();
    const theme = localStorage.getItem("theme");

        if (theme === "dark") {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Memuat data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        Data tidak ditemukan
      </div>
    );
  }

  const inisial = user.nama
    ?.split(" ")
    .map((item) => item[0])
    .join("")
    .toUpperCase();

    const simpanProfile = async () => {
  try {
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data.success) {
      alert("Profil berhasil diperbarui");

      setUser(data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(data.data)
      );

      setEditMode(false);

    } else {
      alert(data.error);
    }

  } catch (error) {
    console.error(error);

    alert("Gagal update profil");
  }
};

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 p-8 transition-all">

      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-8">

        {/* FOTO PROFIL */}
        <div className="flex flex-col items-center mb-8">

          {user.fotoProfil ? (
            <img
              src={user.fotoProfil}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <div
              className="
                w-32 h-32
                rounded-full
                bg-[#004467]
                text-white
                flex
                items-center
                justify-center
                text-4xl
                font-bold
              "
            >
              {inisial}
            </div>
          )}

          <h1 className="text-2xl font-bold mt-4">
            {user.nama}
          </h1>
          <button
            onClick={() => setEditMode(!editMode)}
            className="
            mt-4
            bg-[#004467]
            text-white
            px-6
            py-2
            rounded-xl
            "
          >
            {editMode ? "Batal" : "Edit Profil"}
         </button>

        </div>

        {/* DATA */}
        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-semibold">
              NIK
            </label>
            <input
              value={user.nik}
              readOnly
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Nama Lengkap
            </label>
            <input
              value={user.nama}
              readOnly
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>
            <input
              value={user.email || ""}
              readOnly={!editMode}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              No Telepon
            </label>
            <input
              value={user.noTelepon || ""}
              readOnly={!editMode}
              onChange={(e) =>
                setUser({ ...user, noTelepon: e.target.value })
              }
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Username
            </label>
            <input
              value={user.username || ""}
              readOnly={!editMode}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Password
            </label>
            <input
              value={user.password || ""}
              readOnly={!editMode}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Alamat
            </label>
            <input
              value={user.alamat || ""}
              readOnly
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Jenis Kelamin
            </label>
            <input
              value={user.JenisKelamin || ""}
              readOnly
              className="w-full border p-3 rounded-xl mt-2"
            />
          </div>

        </div>
        {editMode && (
        <button
            onClick={simpanProfile}
            className="
            mt-8
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-3
            rounded-xl
            font-semibold
            "
        >
            Simpan Perubahan
        </button>
        )}

      </div>

    </div>
    </>
  );
}