"use client";

import { useEffect, useState } from "react";

type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  createdAt: string;
};

export default function BeritaPage() {
  const [data, setData] = useState<Berita[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/berita");
    const json = (await res.json()) as Berita[];
    setData(json);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, []);

  return (
    <div>
      <h1>Daftar Berita</h1>

      <a href="/admin/beritaadmin/tambah">+ Tambah Berita</a>

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <b>{item.judul}</b>
            <p>{item.deskripsi}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}