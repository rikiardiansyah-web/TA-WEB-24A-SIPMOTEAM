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

  const logout = () => {
    const konfirmasi = confirm(
      "Yakin ingin keluar dari akun?"
    );

    if (!konfirmasi) return;

    localStorage.removeItem("user");

    alert("Berhasil logout");

    window.location.href = "/login";
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen p-8 transition-all">

      <div className="glass-card max-w-2xl mx-auto p-8">

        {/* FOTO PROFIL */}
<div className="flex flex-col items-center mb-8">

  {user.fotoProfil ? (
    <>
      <img
        src={user.fotoProfil}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover"
      />

      {editMode && (
        <label className="mt-3 cursor-pointer text-cyan-500 text-sm">
          Ubah Foto Profil
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = () => {
                setUser({
                  ...user,
                  fotoProfil: reader.result as string,
                });
              };

              reader.readAsDataURL(file);
            }}
          />
        </label>
      )}
    </>
  ) : (
    <>
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

      {editMode && (
        <label className="mt-3 cursor-pointer text-cyan-500 text-sm">
          Upload Foto Profil
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = () => {
                setUser({
                  ...user,
                  fotoProfil: reader.result as string,
                });
              };

              reader.readAsDataURL(file);
            }}
          />
        </label>
      )}
    </>
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
        <div className="flex flex-col gap-5">

          <div>
            <label className="font-semibold">
              NIK
            </label>
            <input
              value={user.nik}
              readOnly
              className="sipmo-input mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Nama Lengkap
            </label>
            <input
              value={user.nama}
              readOnly
              className="sipmo-input mt-2"
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
              className="sipmo-input mt-2"
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
              className="sipmo-input mt-2"
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
              className="sipmo-input mt-2"
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
              className="sipmo-input mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Alamat
            </label>
            <input
              value={user.alamat || ""}
              readOnly
              className="sipmo-input mt-2"
            />
          </div>

          <div>
            <label className="font-semibold">
              Jenis Kelamin
            </label>
            <input
              value={user.JenisKelamin || ""}
              readOnly
              className="sipmo-input mt-2"
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
        <button
            onClick={logout}
            className="
            mt-4
            w-full
            bg-red-600
            hover:bg-red-700
            text-white
            py-3
            rounded-xl
            font-semibold
            transition
            "
        >
            Logout
        </button>

      </div>

    </div>
    </>
  );
}