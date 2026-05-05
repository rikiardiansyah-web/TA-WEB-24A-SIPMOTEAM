import Image from "next/image";
import Menu from "./components/navbar";
import styles from "./body.module.css";
import Link from "next/link";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Menu /> {/* Nav menu */}
      <div className={`flex flex-col md:flex-row ${styles.homebody}`}>
      <div className="container">
        <h1 className={styles.titlee}>Selamat Datang di SIPMO</h1>
        <p>Sistem Informasi Pengaduan Masyarakat Online</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 mt-8">
        <div className="w-full md:w-1/2 leftbody">
        <p>Desa Sungai Nibung</p>
          Desa Sungai Nibung merupakan salah satu desa yang terletak 
          di Kecamatan Dente Teladas, Kabupaten Tulang Bawang, Provinsi Lampung.
          Desa ini berada di wilayah pesisir yang memiliki potensi sumber daya alam yang cukup besar,
          khususnya di sektor perikanan dan ekosistem mangrove. Desa Sungai Nibung merupakan salah satu dari 
          sekitar 12 desa yang ada di Kecamatan Dente Teladas dan memiliki karakter wilayah pesisir yang strategis.
        </div>
        <div className="w-full md:w-1/2 rightbody">
          <img
            src="/images/gambar1.png"
            alt="Desa Sungai Nibung"
            className="w-full h-auto rounded-lg shadow-md"
            />
        </div>
      </div>
      </div>

<div className="flex justify-center gap-4 mt-6">
  <Link href="/">
    <button className="px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-yellow-600 transition">
      Home
    </button>
  </Link>

  <Link href="/Beranda">
    <button className="px-5 py-2 rounded-full bg-yellow-900 text-white hover:bg-yellow-600 transition">
      Beranda
    </button>
  </Link>
  <Link href="/beranda">
    <button className="px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-yellow-600 transition">
    Beranda
    </button>
  </Link>
</div>
      <div className={`flex flex-col md:flex-row ${styles.homebody}`}>
      <div className="container">
        <h1 className={styles.titlee}>Selamat Datang di SIPMO</h1>
        <p>Sistem Informasi Pengaduan Masyarakat Online</p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 mt-8">
        <div className="w-full md:w-1/2 leftbody">
        <p>Desa Sungai Nibung</p>
          Desa Sungai Nibung merupakan salah satu desa yang terletak 
          di Kecamatan Dente Teladas, Kabupaten Tulang Bawang, Provinsi Lampung.
          Desa ini berada di wilayah pesisir yang memiliki potensi sumber daya alam yang cukup besar,
          khususnya di sektor perikanan dan ekosistem mangrove. Desa Sungai Nibung merupakan salah satu dari 
          sekitar 12 desa yang ada di Kecamatan Dente Teladas dan memiliki karakter wilayah pesisir yang strategis.
        </div>
        <div className="w-full md:w-1/2 rightbody">
          SIPMO memungkinkan masyarakat untuk melaporkan masalah secara real-time dan memantau status pengaduan mereka. Sistem ini juga menyediakan fitur untuk memberikan feedback dan evaluasi terhadap layanan yang diberikan.
        </div>
      </div>
      </div>

      <Footer /> {/* Footer */}
    </>
  );
}
