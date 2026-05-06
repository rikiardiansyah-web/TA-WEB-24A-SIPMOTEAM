"use client";

import { useState } from "react";

export default function TambahBerita() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("/api/berita", {
      method: "POST",
      body: JSON.stringify({ judul, deskripsi }),
    });

    alert("Berita berhasil ditambahkan");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input
        type="text"
        placeholder="Judul"
        onChange={(e) => setJudul(e.target.value)}
        className="border p-2 w-full"
      />

      <textarea
        placeholder="Deskripsi"
        onChange={(e) => setDeskripsi(e.target.value)}
        className="border p-2 w-full"
      />

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  );
}