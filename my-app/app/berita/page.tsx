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
  <div className="mb-6">
      <h1 className="text-4xl font-bold">
        Portal Berita
      </h1>
    <div className="mb-4">
      
    </div>
      <h1 className="text-xl font-bold mb-4">Berita</h1>

      <div className="border rounded-2xl p-4">
        
      </div>

      {data.map((item: Berita) => (
  <div
    key={item.id}
    className="border p-4 mb-4 rounded-xl bg-white shadow"
  >

    <img
      src={item.gambar}
      alt="berita"
      className="w-full h-56 object-cover rounded-xl mb-4"
    />

    <h2 className="font-bold text-xl">
      {item.judul}
    </h2>

    <p className="mt-2">
      {item.deskripsi}
    </p>
  </div>
  ))}
    </div>
  );
}