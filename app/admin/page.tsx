"use client";

import { useEffect, useState } from "react";
import DataWarga from "../components/DataWarga";

import {
  FaNewspaper,
  FaUsers,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUser,
  FaClipboardList,
} from "react-icons/fa";

import Footadmin from "./component/footadmin";
import NavAdmin from "./component/navadmin";
import {useRouter} from "next/navigation";

type Chat = {
  id: number;
  nik: string;
  nama: string;
  username: string;
  createdAt: string;
};

type Pengajuan = {
  id: number;
  nik: string;
  nama: string;
  judul: string;
  deskripsi: string;
  status: string;
  pdfUrl?: string;
  dibacaAdmin: boolean;
  createdAt: string;
  fileUrl?: string;
};

type Aktivitas = {
  id: number;
  aktivitas: string;
  createdAt: string;
};

type Admin = {
  id: number;
  username: string;
  nama: string;
  email?: string;
  noHp?: string;
  fotoProfil?: string;
  role: string;
  aktif: boolean;
  password: string;
};

export default function AdminPage() {
  const [menu, setMenu] = useState("pesan");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [adminProfile, setAdminProfile] = useState<Admin | null>(null);
const [editMode, setEditMode] = useState(false);
  const [pengajuan, setPengajuan] =
    useState<Pengajuan[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [aktivitas, setAktivitas] =
    useState<Aktivitas[]>([]);
  const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
  const loadProfile = async () => {
    const adminData = JSON.parse(localStorage.getItem("admin") || "{}");

    if (!adminData.id) {
      router.push("/login");
      return;
    }

    const res = await fetch(`/api/admin/profile?id=${adminData.id}`);
    const data = await res.json();

    setAdminProfile(data);
  };

  loadProfile();
}, []);
    useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/chat");

        const data = await res.json();

        setChats(data);
        const resPengajuan =
          await fetch("/api/pengajuan");

        const dataPengajuan =
          await resPengajuan.json();

        setPengajuan(dataPengajuan);

        const resAktivitas =
          await fetch("/api/aktivitas");

        const dataAktivitas =
          await resAktivitas.json();

        setAktivitas(dataAktivitas);

console.log(
  "AKTIVITAS DARI API:",
  dataAktivitas
);

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);
  const diajukan =
  pengajuan.filter(
    (item) =>
      item.status === "diajukan"
  );

const diproses =
  pengajuan.filter(
    (item) =>
      item.status === "diproses"
  );

const selesai =
  pengajuan.filter(
    (item) =>
      item.status === "diacc" ||
      item.status === "ditolak"
  );

const diterima =
  pengajuan.filter(
    (item) =>
      item.status === "diacc"
  );

const ditolak =
  pengajuan.filter(
    (item) =>
      item.status === "ditolak"
  );

const handleGantiFoto = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file =
    e.target.files?.[0];

  if (!file || !adminProfile) return;

  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const uploadRes =
    await fetch(
      "/api/admin/upload-foto",
      {
        method: "POST",
        body: formData,
      }
    );

  const uploadData =
    await uploadRes.json();

const updated = {
  ...adminProfile!,
  fotoProfil: uploadData.url,
};

setAdminProfile(updated);

await fetch("/api/admin/profile/update", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(updated),
});
};

  const updateStatus =
  async (
    id: number,
    status: string
  ) => {

    await fetch(
      "/api/pengajuan/status",
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      }
    );

    location.reload();
  };

  const accPengajuan = async (id: number) => {
  if (!pdfFile) {
    alert("Pilih PDF terlebih dahulu");
    return;
  }

  const formData = new FormData();
  formData.append("file", pdfFile);

  const uploadRes = await fetch(
    "/api/pengajuan/upload-pdf",
    {
      method: "POST",
      body: formData,
    }
  );

  const uploadResult =
    await uploadRes.json();

  console.log("HASIL UPLOAD:", uploadResult);

  const statusRes = await fetch(
    "/api/pengajuan/status",
    {
      method: "PATCH",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        id,
        status: "diacc",
        pdfUrl: uploadResult.url,
      }),
    }
  );
  const result = await statusRes.json();

  console.log("HASIL UPDATE:", result);

  location.reload();
  

};

  return (
    <>
      <NavAdmin adminProfile={adminProfile}/>

      <div className="flex min-h-screen pt-[70px] bg-gradient-to-br from-cyan-100 via-white to-sky-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <button
          className="
            md:hidden fixed top-24 left-4 z-50
            bg-[#004467] text-white
            p-3 rounded-xl shadow-lg
          "
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
          <aside
            className={`
              fixed md:relative
              top-[70px] md:top-0
              left-0
              z-40

              w-72
              overflow-y-auto
              h-[calc(100vh-70px)]

              md:h-auto

              bg-gradient-to-b
              from-[#00334d]
              via-[#004467]
              to-[#005b87]

              border-r border-white/20
              text-white
              shadow-2xl

              transition-transform duration-300

              ${
                open
                  ? "translate-x-0"
                  : "-translate-x-full"
              }

              md:translate-x-0
            `}
          >

          <div className="p-6 mt-4">

            <h1 className="text-3xl font-bold mb-10">
              {adminProfile?.nama || "Admin"}
            </h1>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setMenu("pesan");
                  setOpen(false);
                }}
                className="
                  flex items-center justify-between
                  w-full
                  p-4 rounded-2xl
                  hover:bg-[#03618f]
                  transition
                "
              >
                <div className="flex items-center gap-3">
                  <FaEnvelope />
                  <span>Pesan</span>
                </div>

                {chats.length > 0 && (
                  <span
                    className="
                      bg-red-500
                      text-xs
                      px-2 py-1
                      rounded-full
                    "
                  >
                    {chats.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  router.push("/admin/beritaadmin");
                  setOpen(false);
                }}
                className="
                  flex items-center gap-3
                  w-full
                  p-4 rounded-2xl
                  hover:bg-[#03618f]
                  transition
                "
              >
                <FaNewspaper />
                Berita
              </button>
              <button
                onClick={() => {
                  setMenu("pengajuan");
                  setOpen(false);
                }}
                className="
                  flex items-center gap-3
                  w-full
                  p-4 rounded-2xl
                  hover:bg-[#03618f]
                  transition
                "
              >
                <FaClipboardList />
                Pengajuan
              </button>
              <button
                onClick={() => {
                  setMenu("warga");
                  setOpen(false);
                }}
                className="
                  flex items-center gap-3
                  w-full
                  p-4 rounded-2xl
                  hover:bg-[#03618f]
                  transition
                "
              >
                <FaUsers />
                Data Warga
              </button>
              <button
                onClick={() => {
                  setMenu("pembangunan");
                  setOpen(false);
                }}
                className="
                  flex items-center gap-3
                  w-full
                  p-4 rounded-2xl
                  hover:bg-[#03618f]
                  transition
                "
              >
                <FaUser />
                Profil Admin
              </button>

              <button
  onClick={() => {
    setMenu("aktivitas");
    setOpen(false);
  }}
  className="
    flex items-center gap-3
    w-full
    p-4 rounded-2xl
    hover:bg-[#03618f]
    transition
  "
>
  <FaClipboardList />
  Riwayat Aktivitas
</button>

            </div>
          </div>
        </aside>


        <main className="flex-1 p-10 md:p-10">
          {menu === "pesan" && (
            <div>

              <div className="mb-8">

                <h1
                  className="
                    text-4xl font-bold
                    text-[#004467]
                    dark:text-white
                  "
                >
                  Pesan Warga
                </h1>

                <p className="text-gray-500 dark:text-gray-300 mt-2">
                  Semua masukan dan laporan warga akan tampil di sini
                </p>
              </div>

              <div className="space-y-5">

                {chats.length === 0 ? (
                  <div
                    className="
                      bg-white dark:bg-[#1e293b]
                      rounded-3xl
                      p-10
                      shadow-lg
                      text-center
                      text-gray-500 dark:text-gray-300
                    "
                  >
                    Belum ada pesan masuk
                  </div>
                ) : (
                  chats.map((item) => (
                   <div
                    key={item.id}
                    className="
                      bg-white dark:bg-[#1e293b]
                      rounded-3xl
                      shadow-lg
                      p-6
                    "
                  >
                    <div className="flex justify-between items-center">

                      <div>
                        <h2 className="font-bold text-xl dark:text-white">
                          {item.nama}
                        </h2>

                        <p className="text-gray-500 text-sm">
                          NIK: {item.nik}
                        </p>
                      </div>

                      <span className="text-sm text-gray-400">
                        {new Date(item.createdAt).toLocaleDateString("id-ID")}
                      </span>

                    </div>

                    <p className="mt-4 text-gray-500 dark:text-gray-300">
                      Klik tombol di bawah untuk membuka percakapan.
                    </p>

                    <div className="mt-5">

                      <button
                        onClick={() =>
                          router.push(`/admin/chat/${item.id}`)
                        }
                        className="
                          px-5 py-2
                          rounded-xl
                          bg-[#004467]
                          text-white
                          hover:opacity-90
                        "
                      >
                        Buka Chat
                      </button>

                    </div>
                  </div>
                  ))
                )}

              </div>
            </div>
          )}
          {menu === "berita" && (
            <div
              className="
                bg-white dark:bg-[#1e293b]
                rounded-3xl
                p-10
                shadow-lg
              "
            >
              <h1 className="text-3xl font-bold dark:text-white">
                Kelola Berita
              </h1>
            </div>
          )}
          {menu === "pengajuan" && (
            <div>

              <h1 className="text-3xl font-bold dark:text-white mb-6">
                Pengajuan Warga
              </h1>

              <div className="grid lg:grid-cols-3 gap-5">

                {/* DIAJUKAN */}
                <div className="bg-yellow-100 rounded-3xl p-5">

                  <h2 className="font-bold text-xl mb-4">
                    Diajukan ({diajukan.length})
                  </h2>

                  <div className="space-y-3">

                    {diajukan.map((item) => (

                      <div
                        key={item.id}
                        className="
                          bg-white
                          rounded-2xl
                          p-4
                          shadow
                        "
                      >

                        <h3
                          className={`${
                            !item.dibacaAdmin
                              ? "font-bold"
                              : "font-normal"
                          }`}
                        >
                          {item.nama}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.judul}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString("id-ID")}
                        </p>

                        {item.fileUrl && (
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            className="
                              block
                              text-blue-600
                              underline
                              mt-2
                            "
                          >
                            Lihat File
                          </a>
                        )}

                        <div className="flex gap-2 mt-3">

                          <button
                            onClick={() =>
                              updateStatus(
                                item.id,
                                "diproses"
                              )
                            }
                            className="
                              px-3 py-1
                              bg-blue-600
                              text-white
                              rounded-lg
                            "
                          >
                            Proses
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* DIPROSES */}
                <div className="bg-blue-100 rounded-3xl p-5">

                  <h2 className="font-bold text-xl mb-4">
                    Diproses ({diproses.length})
                  </h2>

                  <div className="space-y-3">

                    {diproses.map((item) => (

                      <div
                        key={item.id}
                        className="
                          bg-white
                          rounded-2xl
                          p-4
                          shadow
                        "
                      >

                        <h3 className="font-bold">
                          {item.nama}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.judul}
                        </p>

                        {item.fileUrl && (
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            className="
                              block
                              text-blue-600
                              underline
                              mt-2
                            "
                          >
                            Lihat File
                          </a>
                        )}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) =>
                            setPdfFile(
                              e.target.files?.[0] || null
                            )
                          }
                          className="
                            w-full
                            border
                            rounded-lg
                            p-2
                            mt-2
                          "
                        />

                        <div className="flex gap-2 mt-3">

                          <button
                            onClick={() =>
                              accPengajuan(
                                item.id,
                              )
                            }
                            className="
                              px-3 py-1
                              bg-green-600
                              text-white
                              rounded-lg
                            "
                          >
                            ACC
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                item.id,
                                "ditolak"
                              )
                            }
                            className="
                              px-3 py-1
                              bg-red-600
                              text-white
                              rounded-lg
                            "
                          >
                            Tolak
                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* SELESAI */}
                <div className="bg-green-100 rounded-3xl p-5">

                  <h2 className="font-bold text-xl mb-4">
                    Selesai ({selesai.length})
                  </h2>

                  <div className="space-y-3">

                    {selesai.map((item) => (

                      <div
                        key={item.id}
                        className="
                          bg-white
                          rounded-2xl
                          p-4
                          shadow
                        "
                      >

                        <h3 className="font-bold">
                          {item.nama}
                        </h3>

                        <p>{item.judul}</p>

                        <span
                          className={`
                            text-sm
                            ${
                              item.status === "diacc"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          `}
                        >
                          {item.status}
                        </span>
                          {item.pdfUrl && (
                            <a
                              href={item.pdfUrl}
                              target="_blank"
                              className="
                                block
                                text-blue-600
                                underline
                                mt-2
                              "
                            >
                              Lihat PDF Hasil
                            </a>
                          )}

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>
          )}
          {menu === "warga" && (
            <DataWarga />
          )}
          {menu === "pembangunan" && (
  <div className="bg-white dark:bg-[#1e293b] rounded-3xl p-10 shadow-lg">

    <div className="flex flex-col items-center">

      {/* FOTO PROFIL */}
      <div className="relative">

        {adminProfile?.fotoProfil ? (
          <img
            src={adminProfile.fotoProfil}
            className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-cyan-700 flex items-center justify-center text-white text-4xl font-bold">
            {adminProfile?.nama?.[0]}
          </div>
        )}

        {/* EDIT FOTO (ONLY ICON AREA) */}
        <label className="absolute bottom-0 right-0 bg-cyan-600 text-white p-2 rounded-full cursor-pointer text-xs">
          ✎
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleGantiFoto}
          />
        </label>
      </div>

      {/* ID ADMIN (CENTER BAWAH FOTO - LOCKED) */}
      <div className="mt-3 text-center">
        <p className="text-gray-500 text-sm">ID Admin</p>
        <p className="font-bold text-cyan-700 dark:text-cyan-400 text-lg">
          {adminProfile?.id}
        </p>
      </div>

      {/* NAMA */}
      <h1 className="text-2xl font-bold mt-2 dark:text-white">
        {adminProfile?.nama}
      </h1>

      <p className="text-gray-500 text-sm">
        Administrator Sistem
      </p>
    </div>

    {/* FORM DATA */}
    <div className="mt-8 space-y-4">

      <div>
        <label className="font-semibold">Username</label>
        <input
          value={adminProfile?.username || ""}
          readOnly={!editMode}
          onChange={(e) => setAdminProfile({
            ...adminProfile!,
            username: e.target.value,
          })}
          className="sipmo-input mt-2"
        />
      </div>

      <div>
        <label className="font-semibold">Email</label>
        <input
          value={adminProfile?.email || ""}
          readOnly={!editMode}
          onChange={(e) => setAdminProfile({
            ...adminProfile!,
            email: e.target.value,})
          }
          className="sipmo-input mt-2"
        />
      </div>

      <div>
        <label className="font-semibold">No HP</label>
        <input
          value={adminProfile?.noHp || ""}
          readOnly={!editMode}
          onChange={(e) => setAdminProfile({
            ...adminProfile!,
            noHp: e.target.value,
          })}
          className="sipmo-input mt-2"
        />
      </div>

      <div>
        <label className="font-semibold">Role</label>
        <input
          value={adminProfile?.role || ""}
          readOnly
          className="sipmo-input mt-2 bg-gray-100"
        />
      </div>

      <div>
        <label className="font-semibold">Status</label>
        <input
          value={adminProfile?.aktif ? "Aktif" : "Nonaktif"}
          readOnly
          className="sipmo-input mt-2 bg-gray-100"
        />
      </div>
  <div>
  <label className="font-semibold">Password</label>

  <div className="relative mt-2">
    <input
      type={showPassword ? "text" : "password"}
      value={adminProfile?.password || ""}
      readOnly={!editMode}
      onChange={(e) =>
        setAdminProfile({
          ...adminProfile!,
          password: e.target.value,
        })
      }
      className="sipmo-input w-full pr-10"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-2.5 text-gray-500"
    >
      {showPassword ? "🙈" : "👁"}
    </button>
  </div>
</div>
      <button
  onClick={() => setEditMode(!editMode)}
  className="mt-6 w-full bg-[#004467] text-white py-2 rounded-xl"
>
  {editMode ? "Batal" : "Edit Profil"}
</button>
{editMode && (
  <button
    onClick={async () => {
      const res = await fetch("/api/admin/profile/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminProfile),
      });

      const data = await res.json();

      setAdminProfile(data);
      setEditMode(false);

      alert("Profil berhasil disimpan");
    }}
    className="mt-6 w-full bg-green-600 text-white py-2 rounded-xl"
  >
    Simpan Perubahan
  </button>
)}
    </div>

    {/* STAT BOX */}
    <div className="grid md:grid-cols-3 gap-4 mt-8">

      <div className="bg-cyan-100 dark:bg-cyan-900/30 p-5 rounded-2xl text-center">
        <p>Pesan</p>
        <h2 className="text-2xl font-bold">{chats.length}</h2>
      </div>

      <div className="bg-yellow-100 dark:bg-yellow-900/30 p-5 rounded-2xl text-center">
        <p>Pengajuan</p>
        <h2 className="text-2xl font-bold">{pengajuan.length}</h2>
      </div>

      <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-2xl text-center">
        <p>Status</p>
        <h2 className="text-2xl font-bold">Aktif</h2>
      </div>

    </div>
  </div>
)}
          
  
    

    {menu === "aktivitas" && (
  <div
    className="
      bg-white
      dark:bg-[#1e293b]
      rounded-3xl
      p-10
      shadow-lg
    "
  >
    <h1 className="text-3xl font-bold mb-6 dark:text-white">
      Riwayat Aktivitas Admin
    </h1>

    <div
      className="
        bg-slate-100
        dark:bg-slate-800
        rounded-2xl
        p-4
        max-h-[500px]
        overflow-y-auto
      "
    >
      {aktivitas.length === 0 ? (
        <p className="text-gray-500">
          Belum ada aktivitas
        </p>
      ) : (
        aktivitas.map((item) => (
          <div
            key={item.id}
            className="
              border-b
              border-slate-300
              dark:border-slate-700
              py-3
            "
          >
            <p className="font-medium dark:text-white">
              {item.aktivitas}
            </p>

            <p className="text-xs text-gray-500">
              {new Date(item.createdAt).toLocaleString("id-ID")}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
)}

  


        </main>
      </div>

      <Footadmin />
    </>
  );
}