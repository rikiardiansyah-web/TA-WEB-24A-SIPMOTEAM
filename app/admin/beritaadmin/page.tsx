"use client";

import { useEffect, useState } from "react";
import styles from "./beritaadmin.module.css";
import NavAdmin from "../component/navadmin";

type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  createdAt: string;
};

export default function BeritaPage() {
  const [data, setData] = useState<Berita[]>([]);
  const hapusBerita = async (id: number) => {
  const konfirmasi = confirm(
    "Yakin ingin menghapus berita?"
  );

  if (!konfirmasi) return;

  try {
    await fetch("/api/berita", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    setData((prev) =>
      prev.filter((item) => item.id !== id)
    );

    alert("Berita berhasil dihapus");

  } catch (error) {
    console.error(error);

    alert("Gagal menghapus berita");
  }
};

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/berita", {
          cache: "no-store",
        });

        const json = (await res.json()) as Berita[];
        setData(json);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className={styles.container}>
      <NavAdmin />
      {/* HEADER */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Daftar Berita</h1>

          <p className={styles.subtitle}>
            Kelola berita dan informasi terbaru desa
          </p>
        </div>

        <a
          href="/admin/beritaadmin/tambah"
          className={styles.buttonTambah}
        >
          + Tambah Berita
        </a>
      </div>

      {/* DATA BERITA */}
      {data.length === 0 ? (
        <div className={styles.kosong}>
          Belum ada berita.
        </div>
      ) : (
        <div className={styles.gridBerita}>
          {data.map((item) => (
            <div key={item.id} className={styles.card}>
              
              <img
                src={item.gambar}
                alt="berita"
                className={styles.image}
              />

              <div className={styles.content}>
                
                <h2 className={styles.judul}>
                  {item.judul}
                </h2>

                <p className={styles.deskripsi}>
                  {item.deskripsi}
                </p>

                <div className={styles.footer}>
                  
                  <span className={styles.tanggal}>
                    {new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </span>

                  <div className={styles.buttonGroup}>
                    <button className={styles.edit}>
                    <a href={`/admin/beritaadmin/edit/${item.id}`}>Edit</a>
                    </button>

                    <button className={styles.hapus} onClick={() => hapusBerita(item.id)}>
                      Hapus
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}