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
            bg-white
            dark:bg-slate-800
            rounded-3xl
            overflow-hidden
            shadow-lg
            hover:scale-105
            transition
            duration-100
          "
>
              {/* Gambar */}
              <img 
                src="/images/berita1.jpg"
                alt="berita"
                width={1000}
                height={500}
                className="
                  w-full
                  h-[750px]
                  object-cover
                "
              />

              {/* Isi Card */}
              <div className= "p-8">

        <h2 className="text-4xl font-bold text-center ">
  Membangun Desa yang Lebih Maju
</h2>

          <p className="
            mt-6
            text-lg
            text-gray-700
            max-w-3xl
            leading-8
            text-center
            font-normal
            mx-auto
          ">
            Informasi desa dan pengelolaan anggaran kini dapat diakses
            dengan lebih mudah, transparan, dan terpercaya. Bersama
            masyarakat, desa berkembang menuju masa depan yang lebih
            maju dan sejahtera.
          </p>
        <Image
              src="/images/berita2.PNG"
              alt="gambar tambahan"
              width={1200}
              height={500}
              className="
               w-full
              h-[650px]
              object-cover
              rounded-2xl
               mt-8
               shadow-xl
  "
/>

              </div>
            </div>
          ))}

        </div>

      </div>
    </>
  );
}