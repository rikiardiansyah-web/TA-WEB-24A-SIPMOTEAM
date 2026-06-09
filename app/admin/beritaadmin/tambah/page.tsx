"use client";

import { useState } from "react";
import styles from "../beritaadmin.module.css";

export default function TambahBerita() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!judul || !deskripsi || !gambar) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("judul", judul);
      formData.append("deskripsi", deskripsi);
      formData.append("gambar", gambar);

      await fetch("/api/berita", {
        method: "POST",
        body: formData,
      });

      alert("Berita berhasil ditambah");

      window.location.href = "/admin/beritaadmin";

    } catch (error) {
      console.error(error);
      alert("Gagal menambah berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.formCard}>

        <h1 className={styles.title}>
          Tambah Berita
        </h1>

        <p className={styles.subtitle}>
          Tambahkan informasi terbaru desa
        </p>

        {/* JUDUL */}
        <div className={styles.formGroup}>
          <label>Judul Berita</label>

          <input
            type="text"
            placeholder="Masukkan judul berita"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* DESKRIPSI */}
        <div className={styles.formGroup}>
          <label>Deskripsi</label>

          <textarea
            placeholder="Masukkan isi berita"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            className={styles.textarea}
          />
        </div>

        {/* GAMBAR */}
        <div className={styles.formGroup}>
          <label>Upload Gambar</label>

          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={(e) => {
              if (e.target.files) {
                setGambar(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Menyimpan..." : "Simpan Berita"}
        </button>

      </div>
    </div>
  );
}