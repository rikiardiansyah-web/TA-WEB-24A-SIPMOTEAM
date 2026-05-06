import Image from "next/image";
import Menu from "./components/navbar";
import styles from "./body.module.css";
import Link from "next/link";
import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Menu /> {/* Nav menu */}
      <div className={styles.homebody}>
      <div className={` text-center ${styles.container}`}>
        <h1 className={styles.titlee}>Selamat Datang di SIPMO</h1>
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
        <div className={`w-full max-w-md md:w-1/2 order-1 md:order-2 ${styles.rightbody}`}>
          <img
            src="/images/gambat1.jpg"
            alt="Desa Sungai Nibung"
            className="w-full max-w-md mx-auto h-auto rounded-lg shadow-md"
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

  <Link href="/berita">
    <button className="px-5 py-2 rounded-full bg-yellow-900 text-white hover:bg-yellow-600 transition">
      Berita
    </button>
  </Link>
  <Link href="/beranda">
    <button className="px-5 py-2 rounded-full bg-blue-900 text-white hover:bg-yellow-600 transition">
    Beranda
    </button>
  </Link>
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
      </div>

      <Footer /> {/* Footer */}
    </>
  );
}
