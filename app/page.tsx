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
      
      {/* Main Container dengan Padding untuk Navbar (top) dan Footer (bottom) */}
      <main className="flex-grow pt-24 pb-28 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col gap-16">
        
        {/* HERO SECTION */}
        <section className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[480px] flex items-center justify-center text-white bg-cover bg-center border border-white/10" style={{ backgroundImage: "url('/images/gambar1.jpeg')" }}>
          {/* Cinematic gradient overlay & dynamic technical grid */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/75 to-cyan-950/40 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="relative z-10 text-center px-6 py-12 max-w-3xl flex flex-col gap-6 items-center">
            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Portal Resmi Desa
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 font-bold">SIPMO</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-medium">
              Sistem Informasi Pengaduan Masyarakat Online - Desa Sungai Nibung
            </p>
            <p className="text-sm md:text-base text-gray-300 max-w-xl leading-relaxed">
              Suarakan aspirasi, kritik, dan laporan Anda secara mudah dan cepat demi mewujudkan pelayanan publik dan pembangunan desa yang lebih transparan, responsif, dan maju.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center">
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
                className="sipmo-btn text-base font-semibold cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Berikan Saran & Aduan
              </button>
              <a
                href="#berita-terbaru"
                className="px-6 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold transition backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 duration-200"
              >
                Baca Berita Desa
              </a>
            </div>
          </div>
        </section>

        {/* LAYANAN UTAMA SECTION */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-2xl">
              ✍️
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Pengajuan Online</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Sampaikan pengajuan perubahan data diri secara praktis melalui formulir online kami dan lihat riwayat pengajuannya.
            </p>
                        <button
              onClick={() => {
                const user = JSON.parse(
                  localStorage.getItem("user") || "null"
                );
                if (!user) {
                  window.location.href = "/login";
                  return;
                }
                window.location.href = "/pengajuan";
              }}
              className="mt-auto text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline text-left cursor-pointer flex items-center gap-1"
            >
              Ajukan Perubahan Data &rarr;
            </button>
          </div>
          <div className="glass-card p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center text-2xl">
              🕒
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Response Obrolan</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Pantau respon dan tanggapan dari staf kelurahan/desa secara real-time atas laporan yang telah Anda sampaikan.
            </p>
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
              className="mt-auto text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline text-left cursor-pointer flex items-center gap-1"
            >
              Lihat Riwayat Pesan &rarr;
            </button>
          </div>
          <div className="glass-card p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl">
              📰
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Informasi & Warta</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Dapatkan berita terbaru mengenai program desa, gotong royong, laporan transparansi, serta info penting lainnya.
            </p>
            <Link href="/berita" className="mt-auto text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-left flex items-center gap-1">
              Jelajahi Berita Desa &rarr;
            </Link>
          </div>
        </section>

        {/* TENTANG DESA & POTENSI SECTION */}
        <section className="flex flex-col gap-10">
          
          {/* Tentang Desa */}
          <div className="glass-card p-8 md:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Profil Desa</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white leading-tight">
                Desa Sungai Nibung
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify text-sm md:text-base">
                Desa Sungai Nibung merupakan salah satu desa yang terletak di Kecamatan Dente Teladas, Kabupaten Tulang Bawang, Provinsi Lampung. Desa ini berada di wilayah pesisir yang memiliki potensi sumber daya alam yang cukup besar, khususnya di sektor perikanan dan kelestarian ekosistem mangrove.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify text-sm md:text-base">
                Merupakan salah satu dari 12 desa yang ada di Kecamatan Dente Teladas, Desa Sungai Nibung memiliki karakter wilayah pesisir yang dinamis serta letak geografis strategis yang terus berkembang menuju kemandirian ekonomi.
              </p>
            </div>
            <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-2xl shadow-lg border border-gray-150 dark:border-slate-800">
              <img
                src="/images/gambat1.jpg"
                alt="Desa Sungai Nibung"
                className="w-full h-[280px] md:h-[360px] object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <p className="text-white text-sm font-semibold">Dokumentasi Wilayah Desa Sungai Nibung</p>
              </div>
            </div>
          </div>

          {/* Potensi Perkebunan Tebu */}
          <div className="glass-card p-8 md:p-10 flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">Potensi Unggulan</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white leading-tight">
                Sektor Perkebunan Tebu
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify text-sm md:text-base">
                Selain memiliki keindahan alam pesisir yang memikat, wilayah ini memiliki potensi besar di sektor perkebunan tanaman semusim, salah satunya adalah tebu. Komoditas tebu menjadi salah satu pilar penopang ekonomi hijau terpadu yang dikembangkan demi meningkatkan pendapatan warga lokal.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-justify text-sm md:text-base">
                Dengan teknik budidaya komprehensif mulai dari penanaman hingga pengolahan hasil panen, sektor perkebunan tebu diproyeksikan mampu memperkuat ketahanan pangan dan ekonomi daerah sekaligus membuka peluang agrowisata edukatif di masa depan.
              </p>
            </div>
            <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-2xl shadow-lg border border-gray-150 dark:border-slate-800">
              <img
                src="/images/Kebun tebu.jfif"
                alt="Kebun tebu"
                className="w-full h-[280px] md:h-[360px] object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-6">
                <p className="text-white text-sm font-semibold">Hamparan Kebun Tebu Produktif</p>
              </div>
            </div>
          </div>
        </section>

        {/* BERITA TERBARU SECTION */}
        <section id="berita-terbaru" className="flex flex-col gap-8">
          <div className="flex justify-between items-end border-b border-gray-150 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Kabar Terkini</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-white mt-1">Berita Terbaru</h2>
            </div>
            <Link href="/berita" className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 transition-all">
              Semua Berita &rarr;
            </Link>
          </div>

          {berita.length === 0 ? (
            <div className="glass-card p-12 text-center text-gray-500">
              Belum ada berita terbaru saat ini.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {berita.slice(0, 3).map((item) => (
                <Link
                  href="/berita"
                  key={item.id}
                  className="glass-card overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group flex flex-col"
                >
                  <div className="relative overflow-hidden h-52 bg-gray-150 dark:bg-slate-800">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-cyan-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
                      Info Desa
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow gap-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal tidak tersedia'}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 text-justify leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* MODAL PENGAJUAN / MASUKAN */}
      {open && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalBox} glass-card border-none max-w-[480px] w-full p-6 md:p-8 flex flex-col gap-6`}>
            <div className="flex justify-between items-center pb-3 border-b border-gray-150 dark:border-slate-800">
              <h2 className="text-xl font-extrabold text-gray-800 dark:text-white">
                Kirim Masukan Anda
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white text-2xl font-bold cursor-pointer transition"
              >
                &times;
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal text-left">
                Silakan tuliskan aduan, kritik, saran, atau aspirasi Anda seputar pembangunan dan pelayanan Desa Sungai Nibung.
              </p>
              
              <textarea
                placeholder="Ketik masukan Anda di sini..."
                className="sipmo-input min-h-[150px] resize-none text-sm leading-relaxed"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
              />
              
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={kirimPesan}
                  disabled={loading}
                  className="sipmo-btn flex-grow text-sm font-semibold cursor-pointer shadow-md flex items-center justify-center"
                >
                  {loading ? "Mengirim..." : "Kirim Aspirasi"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer /> {/* Footer */}
    </>
  );
}

// auto-commit-update: iteration 16 - 2026-06-12 21:11:02