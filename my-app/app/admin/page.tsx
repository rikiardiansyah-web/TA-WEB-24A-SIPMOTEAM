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

type Pesan = {
  id: number;
  nama: string;
  nik: string;
  isi: string;
  createdAt: string;
};

export default function AdminPage() {
  const [menu, setMenu] = useState("pesan");
  const [open, setOpen] = useState(false);

  const [pesan, setPesan] = useState<Pesan[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/pesan");

        const data = await res.json();

        setPesan(data);

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  return (
    <>
      <NavAdmin />

      <div className="flex bg-gray-100 dark:bg-[#0f172a] min-h-screen pt-20">
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
            fixed top-0 left-0 z-40
            h-screen w-72
            bg-[#004467]
            text-white
            shadow-2xl

            transform transition-transform duration-300

            ${open ? "translate-x-0" : "-translate-x-full"}

            md:translate-x-0
          `}
        >

          <div className="p-6 mt-20">

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

                {pesan.length > 0 && (
                  <span
                    className="
                      bg-red-500
                      text-xs
                      px-2 py-1
                      rounded-full
                    "
                  >
                    {pesan.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setMenu("berita");
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


        <main className="flex-1 md:ml-72 p-5 md:p-10">
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

                {pesan.length === 0 ? (
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
                  pesan.map((item) => (
                    <div
                      key={item.id}
                      className="
                        bg-white dark:bg-[#1e293b]
                        rounded-3xl
                        shadow-lg
                        p-6
                      "
                    >

                      <div className="flex justify-between mb-4">

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

                      <p className="text-gray-700 dark:text-gray-200 leading-7">
                        {item.isi}
                      </p>

                      <div className="mt-5 flex gap-3">

                        <button
                          className="
                            px-5 py-2
                            rounded-xl
                            bg-[#004467]
                            text-white
                            hover:opacity-90
                          "
                        >
                          Balas
                        </button>

                        <button
                          className="
                            px-5 py-2
                            rounded-xl
                            bg-red-500
                            text-white
                            hover:opacity-90
                          "
                        >
                          Hapus
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