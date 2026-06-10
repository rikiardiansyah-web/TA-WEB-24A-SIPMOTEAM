"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/navbar";

type Pengajuan = {
  id: number;
  judul: string;
  deskripsi: string;
  status: string;
  pdfUrl?: string;
  createdAt: string;
  fileUrl?: string;
};

export default function PengajuanPage() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const [file, setFile] = useState<File | null>(null);

  const [data, setData] =
    useState<Pengajuan[]>([]);

  const [loading, setLoading] =
    useState(false);

  const loadPengajuan =
    async () => {

      const user = JSON.parse(
        localStorage.getItem("user") ||
        "null"
      );

      if (!user) return;

      const res = await fetch(
        `/api/pengajuan?nik=${user.nik}`
      );

      const result =
        await res.json();

      setData(result);
    };

  useEffect(() => {
  (async () => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) return;

    const res = await fetch(
      `/api/pengajuan?nik=${user.nik}`
    );

    const result = await res.json();

    setData(result);
  })();
}, []);

  const kirimPengajuan =
    async () => {

      const user = JSON.parse(
        localStorage.getItem("user") ||
        "null"
      );

      if (!user) {
        alert("Silahkan login");
        return;
      }

      if (!judul || !deskripsi) {
        alert(
          "Lengkapi data terlebih dahulu"
        );
        return;
      }

      try {

        setLoading(true);

        const res = await fetch(
          "/api/pengajuan",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              nik: user.nik,
              nama: user.nama,
              judul,
              deskripsi,
            }),
          }
        );

        const result =
          await res.json();

        if (!res.ok) {
          alert(result.error);
          return;
        }

        alert(
          "Pengajuan berhasil dikirim"
        );

        setJudul("");
        setDeskripsi("");

        loadPengajuan();

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

  const diajukan =
    data.filter(
      (item) =>
        item.status === "diajukan"
    );

  const diproses =
    data.filter(
      (item) =>
        item.status === "diproses"
    );

  const selesai =
    data.filter(
      (item) =>
        item.status === "diacc" ||
        item.status === "ditolak"
    );

  return (
    <>
      <Navbar />

      <div className="pt-28 px-5 min-h-screen">

        <div className="max-w-4xl mx-auto">

          <h1 className="text-3xl font-bold mb-8">
            Pengajuan Perubahan Data
          </h1>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg">

            <input
              value={judul}
              onChange={(e) =>
                setJudul(
                  e.target.value
                )
              }
              placeholder="Judul Pengajuan"
              className="
                w-full
                border
                rounded-xl
                p-3
                mb-4
              "
            />

            <textarea
              value={deskripsi}
              onChange={(e) =>
                setDeskripsi(
                  e.target.value
                )
              }
              placeholder="Deskripsi Pengajuan"
              rows={5}
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />

            <input
            type="file"
            onChange={(e) =>
                setFile(
                e.target.files?.[0] || null
                )
            }
            className="
                w-full
                border
                rounded-xl
                p-3
                mt-4
            "
            />

            <button
              onClick={
                kirimPengajuan
              }
              disabled={loading}
              className="
                mt-4
                bg-cyan-600
                text-white
                px-5
                py-2
                rounded-xl
              "
            >
              {loading
                ? "Mengirim..."
                : "Kirim"}
            </button>

          </div>

          <div
            className="
              flex md:flex-col
              gap-5
              overflow-x-auto
              mt-10
            "
          >

            {/* DIAJUKAN */}

            <div className="min-w-[300px] bg-yellow-100 p-5 rounded-3xl">

              <h2 className="font-bold text-xl mb-4">
                Diajukan
                ({diajukan.length})
              </h2>

              {diajukan.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      bg-white
                      rounded-xl
                      p-3
                      mb-3
                    "
                  >
                    <h3 className="font-bold">
                      {item.judul}
                    </h3>

                    <p>
                      {item.status}
                    </p>
                  </div>
                )
              )}

            </div>

            {/* DIPROSES */}

            <div className="min-w-[300px] bg-blue-100 p-5 rounded-3xl">

              <h2 className="font-bold text-xl mb-4">
                Diproses
                ({diproses.length})
              </h2>

              {diproses.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      bg-white
                      rounded-xl
                      p-3
                      mb-3
                    "
                  >
                    <h3 className="font-bold">
                      {item.judul}
                    </h3>

                    <p>
                      {item.status}
                    </p>
                  </div>
                )
              )}

            </div>

            {/* SELESAI */}

            <div className="min-w-[300px] bg-green-100 p-5 rounded-3xl">

              <h2 className="font-bold text-xl mb-4">
                Selesai
                ({selesai.length})
              </h2>

              {selesai.map(
                (item) => (
                  <div
                    key={item.id}
                    className="
                      bg-white
                      rounded-xl
                      p-3
                      mb-3
                    "
                  >
                    <h3 className="font-bold">
                      {item.judul}
                    </h3>

                    <p>
                      {item.status}
                    </p>

                    {item.status ===
                      "diacc" &&
                      item.pdfUrl && (
                        <a
                          href={
                            item.pdfUrl
                          }
                          target="_blank"
                          className="
                            text-blue-600
                            underline
                          "
                        >
                          Download PDF
                        </a>
                      )}
                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </div>
    </>
  );
}