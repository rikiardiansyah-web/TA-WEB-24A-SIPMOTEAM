"use client";

import Menu from "../components/navbar";
import { useEffect, useState } from "react";

type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  createdAt: string;
};

export default function BeritaUser() {

  const [data, setData] = useState<Berita[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const getBerita = async () => {

      try {

        const res = await fetch("/api/berita");

        const json = await res.json();

        setData(json);

      } catch (error) {
        console.error(error);
      }
    };

    getBerita();

  }, []);

  const filteredData = data.filter((item) =>
    item.judul.toLowerCase().includes(search.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(search.toLowerCase()) ||
    new Date(item.createdAt)
      .toLocaleDateString("id-ID")
      .includes(search)
  );

  return (
    <>
      <Menu />

      <div className="pt-24 px-8 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold dark:text-white">
            Portal Berita
          </h1>

          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Informasi Terbaru dan Terpercaya
          </p>

        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Cari judul, deskripsi, atau tanggal upload..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            border
            border-gray-300
            dark:border-slate-600
            p-4
            rounded-2xl
            mb-10
            shadow-sm
            focus:outline-none
            focus:ring-4
            focus:ring-blue-400/40
            focus:border-blue-500
            transition
            dark:bg-slate-800
            dark:text-white
          "
        />

        {/* Hero */}
        <div className="mb-16">

          <div
            className="
              bg-gradient-to-r
              from-blue-700
              to-slate-900
              rounded-3xl
              p-10
              text-white
              shadow-2xl
            "
          >

            <h2 className="text-4xl font-bold">
              Transparansi Anggaran Desa 2026
            </h2>

            <p className="mt-4 text-lg text-gray-200 max-w-2xl leading-relaxed">
              Temukan berbagai informasi terbaru,
              terpercaya, dan paling update setiap hari
              hanya di Portal Berita SIPMO.
            </p>

          </div>

        </div>

        {/* Judul */}
        <h1 className="text-3xl font-bold mb-10 text-center dark:text-white">
          Bersama Masyarakat Desa Berkembang Dan Maju
        </h1>

        {/* Card */}
        <div className="grid grid-cols-1 gap-10">

          {filteredData.map((item) => (

            <div
              key={item.id}
              className="
                max-w-3xl
                mx-auto
                rounded-3xl
                overflow-hidden
                shadow-lg
                hover:scale-[1.01]
                transition
                duration-300
                bg-white/10
                dark:bg-slate-800/30
                backdrop-blur-md
              "
            >

              {/* Gambar */}
              <img
                src={item.gambar}
                alt={item.judul}
                className="
                  w-full
                  h-auto
                  object-contain
                  bg-black
                "
              />

              {/* Isi */}
              <div className="p-8">

                <h2 className="text-4xl font-bold text-center">
                  {item.judul}
                </h2>

                <p
                  className="
                    mt-6
                    text-lg
                    leading-8
                    text-center
                    mx-auto
                  "
                >
                  {item.deskripsi}
                </p>

                <p className="text-sm text-center mt-6 text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString("id-ID")}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}
// auto-commit-update: iteration 8 - 2026-06-12 20:53:16