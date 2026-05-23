"use client;"

import Menu from "../components/navbar";
type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  createdAt: string;
};

export default async function BeritaUser() {
  const res = await fetch("http://localhost:3000/api/berita", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <>
    <Menu /> {/* Nav menu */}
    <div className="text-center pt-24 mb-10">
  <h1 className="text-5xl font-extrabold text-slate-800 dark:text-white">
    Portal Berita
  </h1>
   <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
    Informasi Terbaru dan Terpercaya
  </p>
      <input
  type="text"
  placeholder="Cari berita..."
  className="
    w-full
    border
    p-3
    rounded-xl
    mb-6
    dark:bg-gray-800
    dark:text-white  
  "
  />
      <div className="mb-4">
     </div>
      <div className="mb-4">
      </div>
      <h1 className="text-xl font-bold mb-4 dark:text-white">Berita</h1>
      <div className="border rounded-2xl p-4">
      </div>

      {data.map((item: Berita) => (
  <div
    key={item.id}
    className="border p-4 mb-4 rounded-xl bg-white shadow"
  >

    <img
      src={item.gambar}
      alt="berita"
      className="w-full h-56 object-cover rounded-xl mb-4"
    />

    <h2 className="font-bold text-xl">
      {item.judul}
    </h2>

    <p className="mt-2 dark:text-gray-300">
      {item.deskripsi}
    </p>
  </div>
  ))}
    </div>
    </>
  );
}