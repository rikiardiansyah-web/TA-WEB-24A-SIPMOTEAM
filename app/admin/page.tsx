"use client";

import { useEffect, useState } from "react";
import DataWarga from "../components/DataWarga";

import {
  FaNewspaper,
  FaUsers,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaBuilding,
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

export default function AdminPage() {
  const [menu, setMenu] = useState("pesan");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [pengajuan, setPengajuan] =
    useState<Pengajuan[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

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

  return (
    <>
      <NavAdmin />

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
              SIPMO Admin
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
                <FaBuilding />
                Profil Admin
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

                        <div className="flex gap-2 mt-3">

                          <button
                            onClick={() =>
                              updateStatus(
                                item.id,
                                "diacc"
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
            <div
  className="
    bg-white dark:bg-[#1e293b]
    rounded-3xl
    p-10
    shadow-lg
  "
>
  <div className="flex flex-col md:flex-row items-center gap-8">
    
    {/* Foto Profil */}
    <div
      className="
        w-32 h-32
        rounded-full
        bg-gradient-to-br
        from-cyan-500
        to-blue-700
        flex
        items-center
        justify-center
        text-white
        text-5xl
        font-bold
      "
    >
      <img
  src="/images/admin.jpg"
  alt="Foto Admin"
  className="
    w-32
    h-32
    rounded-full
    object-cover
    border-4
    border-cyan-500
    shadow-lg
  "
/>
    </div>

    {/* Informasi Admin */}
    <div className="flex-1">
      <h1
        className="
          text-3xl
          font-bold
          text-slate-800
          dark:text-white
        "
      >
        Admin SIPMO
      </h1>

      <p className="text-gray-500 mt-1">
        Administrator Sistem
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        
        <div>
          <p className="text-gray-500 text-sm">
            Username
          </p>
          <p className="font-semibold dark:text-white">
            admin
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Email
          </p>
          <p className="font-semibold dark:text-white">
            admin@sipmo.com
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Role
          </p>
          <p className="font-semibold dark:text-white">
            Super Admin
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">
            Status
          </p>
          <span
            className="
              inline-block
              px-3
              py-1
              rounded-full
              bg-green-100
              text-green-700
              text-sm
              font-medium
            "
          >
            Aktif
          </span>
        </div>

      </div>

      <button
        className="
          mt-6
          px-6
          py-3
          bg-cyan-600
          hover:bg-cyan-700
          text-white
          rounded-xl
          transition
        "
      >
        Edit Profil
      </button>

      <div className="grid md:grid-cols-3 gap-4 mt-8">

  <div
    className="
      bg-cyan-100
      dark:bg-cyan-900/30
      rounded-2xl
      p-5
      text-center
    "
  >
    <h3 className="text-gray-500 dark:text-gray-300">
      Pesan Masuk
    </h3>

    <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">
      {chats.length}
    </p>
  </div>

  <div
    className="
      bg-yellow-100
      dark:bg-yellow-900/30
      rounded-2xl
      p-5
      text-center
    "
  >
    <h3 className="text-gray-500 dark:text-gray-300">
      Pengajuan
    </h3>

    <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
      {pengajuan.length}
    </p>
  </div>

  <div
    className="
      bg-green-100
      dark:bg-green-900/30
      rounded-2xl
      p-5
      text-center
    "
  >
    <h3 className="text-gray-500 dark:text-gray-300">
      Status
    </h3>

    <p className="text-3xl font-bold text-green-700 dark:text-green-400">
      Aktif
    </p>
  </div>

</div>
    </div>

  </div>
</div>
          )}

        </main>
      </div>

      <Footadmin />
    </>
  );
}