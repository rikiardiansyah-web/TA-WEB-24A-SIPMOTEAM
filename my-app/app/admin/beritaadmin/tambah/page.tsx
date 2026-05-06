"use client";

import { useState } from "react";

export default function TambahBerita() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const submit = async () => {
    await fetch("/api/berita", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, deskripsi }),
    });

    alert("Berita berhasil ditambah");
    window.location.href = "/berita"; // balik ke list
  };

  return (
    <div>
      <h1>Tambah Berita</h1>

      <input
        placeholder="Judul"
        value={judul}
        onChange={(e) => setJudul(e.target.value)}
      />

      <textarea
        placeholder="Deskripsi"
        value={deskripsi}
        onChange={(e) => setDeskripsi(e.target.value)}
      />

      <button onClick={submit}>Simpan</button>
    </div>
  );
}