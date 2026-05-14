"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../../beritaadmin.module.css";

export default function EditBerita() {
  const params = useParams();
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambar, setGambar] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/berita");
        const data = await res.json();

        const berita = data.find(
            (item: {
                id: number;
                judul: string;
                deskripsi: string;
                gambar: string;
            }) =>
                item.id === Number(params.id)
        );

        if (berita) {
          setJudul(berita.judul);
          setDeskripsi(berita.deskripsi);
          setGambar(null); // Reset the image input
        }

      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, [params.id]);

  const updateBerita = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("id", String(params.id));
      formData.append("judul", judul);
      formData.append("deskripsi", deskripsi);

      if (gambar) {
        formData.append("gambar", gambar);
      }

      await fetch("/api/berita", {
        method: "PUT",
        body: formData,
      });

      alert("Berita berhasil diupdate");

      router.push("/admin/beritaadmin");

    } catch (error) {
      console.error(error);
      alert("Gagal update berita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.formCard}>

        <h1 className={styles.title}>
          Edit Berita
        </h1>

        <p className={styles.subtitle}>
          Update berita desa
        </p>

        <div className={styles.formGroup}>
          <label>Judul</label>

          <input
            type="text"
            value={judul}
            onChange={(e) =>
              setJudul(e.target.value)
            }
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Deskripsi</label>

          <textarea
            value={deskripsi}
            onChange={(e) =>
              setDeskripsi(e.target.value)
            }
            className={styles.textarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Ganti Gambar</label>

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

        <button
          onClick={updateBerita}
          className={styles.submitButton}
          disabled={loading}
        >
          {loading
            ? "Menyimpan..."
            : "Update Berita"}
        </button>

      </div>
    </div>
  );
}