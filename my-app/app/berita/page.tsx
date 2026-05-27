import Menu from "../components/navbar";
import Image from "next/image";

type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  createdAt: string;
};

export default async function BeritaUser() {
  const res = await fetch("http://localhost:3000/api/berita", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <>
      {/* Navbar */}
      <Menu />

      {/* Container */}
      <div className="pt-24 px-8 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-slate-800 dark:text-white">
            Portal Berita
          </h1>

          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Informasi Terbaru dan Terpercaya
          </p>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Cari berita..."
          className="
            w-full
            border
            border-gray-300
            p-4
            rounded-2xl
            mb-10
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:bg-slate-800
            dark:text-white
          "
        />
        {/* Hero Section */}
        <div className="mb-16">
          <div
            className="
              bg-gradient-to-r
              from-blue-700
              to-slate-900
              rounded-3xl
              p-10
              text-white
              shadow-2xl
            "
          >
            <h2 className="text-4xl font-bold">
               Transpartasi Anggaran Desa 2026
            </h2>

            <p className="mt-4 text-lg text-gray-200 max-w-2xl leading-relaxed">
              Temukan berbagai informasi terbaru,
              terpercaya, dan paling update setiap hari
              hanya di Portal Berita SIPNO.
            </p>

            <button
              className="
                mt-6
                bg-white
                text-blue-700
                px-6
                py-3
                rounded-xl
                font-semibold
                hover:scale-105
                transition
              "
            >
              Jelajahi Berita
            </button>
          </div>

        </div>

        {/* Judul Berita */}
        <h1 className="text-3xl font-bold mb-10 text-center dark:text-white">
          Bersama Masyarakat Desa Berkembang Dan Maju 
        </h1>

        {/* Card Berita */}
      <div className="grid grid-cols-1 gap-10">

          {data.map((item: Berita) => (
            <div
            key={item.id}
            className="
            max-w-5xl
            mx-auto
            rounded-3xl
            overflow-hidden
            shadow-lg
            hover:scale-105
            transition
            duration-100
          "
          >

          {/* Gambar dari database */}
          
            <img
            src={item.gambar}
            alt={item.judul}
            className="
            w-full
            h-[500px]
            object-cover
            "
            />

          {/* Isi */}
            <div className="p-8">

           <h2 className="text-4xl font-bold text-center dark:text-white">
           {item.judul}
          </h2>

          <p
          className="
          mt-6
          text-lg
          max-w-3xl
          leading-8
          text-center
          font-normal
          mx-auto
        "
      >
        {item.deskripsi}
        </p>

        <p className="text-sm text-center mt-6 text-gray-400">
        {new Date(item.createdAt).toLocaleDateString("id-ID")}
        </p>

        </div>
        </div>
        ))}

        </div>

      </div>
    </>
  );
}