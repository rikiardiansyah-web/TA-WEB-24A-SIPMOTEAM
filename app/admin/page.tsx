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
                Pembangunan
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
            <div
              className="
                bg-white dark:bg-[#1e293b]
                rounded-3xl
                p-10
                shadow-lg
              "
            >
              <h1 className="text-3xl font-bold dark:text-white">
                Pengajuan Warga
              </h1>
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
              <h1 className="text-3xl font-bold dark:text-white">
                Laporan Pembangunan Desa
              </h1>
            </div>
          )}

        </main>
      </div>

      <Footadmin />
    </>
  );
}