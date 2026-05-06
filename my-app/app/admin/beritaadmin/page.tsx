"use client";

import Link from "next/link";

export default function BeritaAdmin() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Kelola Berita</h1>

      <Link href="/admin/berita/tambah">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Tambah Berita
        </button>
      </Link>
    </div>
  );
}