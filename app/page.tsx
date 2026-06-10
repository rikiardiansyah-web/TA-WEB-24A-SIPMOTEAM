"use client";

import Image from "next/image";
import Menu from "./components/navbar";
import styles from "./body.module.css";
import Link from "next/link";
import Footer from "./components/footer";
import { useEffect , useState } from "react";

type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  createdAt: string;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [pesan, setPesan] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifPesan, setNotifPesan] = useState(0);
  const [berita, setBerita] = useState<Berita[]>([]);

const kirimPesan = async () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    alert("Silahkan login terlebih dahulu");
    window.location.href = "/login";
    return;
  }

  if (!pesan.trim()) {
    alert("Pesan tidak boleh kosong");
    return;
  }

  try {
    setLoading(true);

    // buat / ambil chat
    const chatRes = await fetch(
      "/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nik: user.nik,
        }),
      }
    );

    const chat = await chatRes.json();

    const messageRes = await fetch(
      "/api/chat/message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chat.id,
          pengirim: "user",
          isi: pesan,
        }),
      }
    );

    if (!messageRes.ok) {
      throw new Error("Gagal mengirim pesan");
    }

    alert("Pesan berhasil dikirim");

    setPesan("");
    setOpen(false);

  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  const loadData = async () => {
    try {
      const res = await fetch("/api/berita");

      const data = await res.json();

      setBerita(data);

    } catch (error) {
      console.error(error);
    }
  };

  loadData();
}, []);

  return (
    <>
      <Menu /> {/* Nav menu */}
      <div className={styles.beranda}>
      <div className={styles.transparan}>
      <div className={` text-center ${styles.container}`}>
        <h1 className={styles.titlee}>Selamat Datang Sipmo - Desa Sungai Nibung</h1>
        <p>Sistem Informasi Pengaduan Masyarakat Online</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 mt-8">
        <div className={`w-full md:w-1/2 order-2 md:order-2 ${styles.leftbody}`}>
        <p>Desa Sungai Nibung</p>
          Desa Sungai Nibung merupakan salah satu desa yang terletak 
          di Kecamatan Dente Teladas, Kabupaten Tulang Bawang, Provinsi Lampung.
          Desa ini berada di wilayah pesisir yang memiliki potensi sumber daya alam yang cukup besar,
          khususnya di sektor perikanan dan ekosistem mangrove. Desa Sungai Nibung merupakan salah satu dari 
          sekitar 12 desa yang ada di Kecamatan Dente Teladas dan memiliki karakter wilayah pesisir yang strategis.
        </div>
  
      </div>
      <div >
        <a >
          Jika Kamu Bagian Dari Desa Sungai Nibung, Silahkan Kirimkan MasukanMu Dibawah ini
        </a>
      </div>
    <button 
    onClick={() => {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setOpen(true);
    }}
    className="px-50 py-2 rounded-full bg-blue-900 text-white hover:bg-blue-300 transition">
      Berikan Saranmu
    </button>
      </div>
      </div>
      {open && (
        <div className={styles.modalOverlay}>
        <div className={styles.modalBox}>

        <button
         onClick={() => setOpen(false)}
        className={styles.closeBtn}
      >x
      </button>
      <h2 className={styles.modalTitle}>
        Kirim Masukan
      </h2>
      <textarea
        placeholder="Kirimkan Masukanmu Disini..."
        className={styles.textarea}
        value={pesan}
        onChange={(e) => setPesan(e.target.value)}
      />
      <button className={styles.submitBtn}
        onClick={kirimPesan}
        disabled={loading}
      >
        {loading ? "Mengirim..." : "Kirim"}
      </button>

      </div>
      </div>
      )}



<div className="flex justify-center gap-10 mt-4">
  <Link href="/">
    <button className="w-200 px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-yellow-400 transition">
     Home
  </button>
  </Link>

  <Link href="/berita">
    <button className="px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-yellow-600 transition">
      Berita
    </button>
  </Link>
  <button
  onClick={() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      window.location.href = "/login";
      return;
    }

    window.location.href = "/beranda";
  }}
  className="px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-yellow-600 transition"
>
  Beranda
</button>
  <button
  onClick={() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      window.location.href = "/login";
      return;
    }

    window.location.href = "/riwayatpesan";
  }}
  className="relative px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-red-600 transition"
>
  Riwayat Pesan

  {notifPesan > 0 && (
    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
      {notifPesan}
    </span>
  )}
</button>
</div>
      <div className={styles.homebody}>
      <div className={` text-center ${styles.container}`}>
        <h1 className={styles.titlee}>Selamat Datang di SIPMO</h1>
        <p>Sistem Informasi Pengaduan Masyarakat Online</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 mt-8">
        <div className={`w-full md:w-1/2 ${styles.leftbody}`}>
        <p>Desa Sungai Nibung</p>
          Desa Sungai Nibung merupakan salah satu desa yang terletak 
          di Kecamatan Dente Teladas, Kabupaten Tulang Bawang, Provinsi Lampung.
          Desa ini berada di wilayah pesisir yang memiliki potensi sumber daya alam yang cukup besar,
          khususnya di sektor perikanan dan ekosistem mangrove. Desa Sungai Nibung merupakan salah satu dari 
          sekitar 12 desa yang ada di Kecamatan Dente Teladas dan memiliki karakter wilayah pesisir yang strategis.
        </div>
        <div className={`w-full md:w-1/2 ${styles.rightbody}`}>
          <img
            src="/images/gambat1.jpg"
            alt="Desa Sungai Nibung"
            className="w-full h-auto rounded-lg shadow-md"
            />
        </div>
        
        
      </div>

<div className="flex flex-col md:flex-row items-center justify-center gap-1 mt-8">
  <div className={`w-full md:w-1/2 ${styles.leftbody}`}>
          <img
            src="/images/Kebun tebu.jfif"
            alt="Kebun tebu"
            className="w-full h-auto rounded-lg shadow-md"
            />
        </div>
        <div className={`w-full md:w-1/2 ${styles.rightbody}`}>
          <p>Potensi Sektor Perkebunan Tebu</p>
          Selain memiliki keindahan alam yang memikat, wilayah Lampung 
          Barat juga memiliki potensi besar di sektor perkebunan tanaman semusim,
          salah satunya adalah tebu. Komoditas tebu menjadi salah satu pilar penopang
          ekonomi hijau yang dikembangkan secara terpadu demi meningkatkan pendapatan masyarakat lokal. 
          Dengan teknik budidaya yang komprehensif mulai dari penanaman hingga pengolahan hasil panen, sektor
          perkebunan tebu ini diproyeksikan mampu memperkuat ketahanan pangan sekaligus membuka peluang agrowisata
          baru yang edukatif di masa depan.
        </div>
        
        

        
      </div>

      </div>

      <div className="px-5 py-10">

  <h1 className="text-3xl font-bold text-center mb-8">
    Berita Terbaru
  </h1>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {berita.slice(0, 3).map((item) => (
    <Link
      href="/berita"
      key={item.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 block"
    >

        <img
          src={item.gambar}
          alt={item.judul}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

          <h2 className="text-xl font-bold mb-3">
            {item.judul}
          </h2>

          <p className="text-gray-600 line-clamp-3">
            {item.deskripsi}
          </p>

        </div>
      </Link>
    ))}

  </div>
</div>

      <Footer /> {/* Footer */}
    </>
  );
}
