"use client";

import { useEffect, useState } from "react";

type Warga = {
  nik: number;
  username?: string;
  nama: string;
  email?: string;
  noTelepon?: string;
  password?: string;
  alamat?: string;
  JenisKelamin?: string;
  status?: string;
};

export default function DataWarga() {

  const [data, setData] = useState<Warga[]>([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    nik: "",
    nama: "",
    noTelepon: "",
    alamat: "",
    JenisKelamin: "",
    status: "Aktif",
  });

  const loadData = async () => {
    try {

      const res = await fetch("/api/warga");

      const json = await res.json();

      setData(json);

    } catch (error) {
      console.error("Gagal load warga:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
    await loadData();
  };

  fetchData();
  }, []);

  // TAMBAH WARGA
  const tambahWarga = async () => {
    try {

      const res = await fetch("/api/warga", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,
          nik: form.nik,
        }),
      });

      if (!res.ok) {
        alert("Gagal tambah warga");
        return;
      }

      alert("Warga berhasil ditambah");

      setForm({
        nik: "",
        nama: "",
        noTelepon: "",
        alamat: "",
        JenisKelamin: "",
        status: "Aktif",
      });

      loadData();

    } catch (error) {
      console.error(error);
    }
  };

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase()) ||
    item.nik.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* FORM */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-md">

        <h1 className="text-2xl font-bold mb-6 text-[#004467] dark:text-white">
          Tambah Data Warga
        </h1>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="number"
            placeholder="NIK"
            value={form.nik}
            onChange={(e) =>
              setForm({ ...form, nik: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Nama Lengkap"
            value={form.nama}
            onChange={(e) =>
              setForm({ ...form, nama: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="No Telepon"
            value={form.noTelepon}
            onChange={(e) =>
              setForm({ ...form, noTelepon: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <input
            type="text"
            placeholder="Alamat"
            value={form.alamat}
            onChange={(e) =>
              setForm({ ...form, alamat: e.target.value })
            }
            className="border p-3 rounded-xl"
          />

          <select
            value={form.JenisKelamin}
            onChange={(e) =>
              setForm({
                ...form,
                JenisKelamin: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          >
            <option value="">Jenis Kelamin</option>
            <option value="Laki-Laki">Laki-Laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>

          <select
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
            className="border p-3 rounded-xl"
          >
            <option value="Aktif">Aktif</option>
            <option value="Pindah">Pindah</option>
            <option value="Meninggal">Meninggal</option>
          </select>

        </div>

        <button
          onClick={tambahWarga}
          className="mt-6 bg-[#004467] hover:bg-[#006699] text-white px-6 py-3 rounded-xl transition"
        >
          Simpan Data Warga
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-md overflow-auto">
        <input
          type="text"
          placeholder="Cari warga..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
          w-full
          border
        border-gray-300
        dark:border-slate-600
          p-3
          rounded-xl
          mb-6
          focus:outline-none
          focus:ring-2
        focus:ring-blue-500
       "
      />

        <h1 className="text-2xl font-bold mb-6 text-[#004467] dark:text-white">
          Data Warga
        </h1>

        <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-3">NIK</th>
              <th className="text-left p-3">Nama</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">No Telepon</th>
              <th className="text-left p-3">Username</th>
              <th className="text-left p-3">Password</th>
              <th className="text-left p-3">Alamat</th>
              <th className="text-left p-3">Jenis Kelamin</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.nik}
                className="border-b hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <td className="p-3">{item.nik}</td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.noTelepon}</td>
                <td className="p-3">{item.username}</td>
                <td className="p-3">{item.password}</td>
                <td className="p-3">{item.alamat}</td>
                <td className="p-3">{item.JenisKelamin}</td>
                <td className="p-3">{item.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>
      </div>
    </div>
  );
}