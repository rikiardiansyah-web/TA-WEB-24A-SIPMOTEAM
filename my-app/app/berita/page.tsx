type Berita = {
  id: number;
  judul: string;
  deskripsi: string;
  createdAt: string;
};

export default async function BeritaUser() {
  const res = await fetch("http://localhost:3000/api/berita", {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Berita</h1>

      {data.map((item: Berita) => (
        <div key={item.id} className="border p-4 mb-4">
          <h2 className="font-bold">{item.judul}</h2>
          <p>{item.deskripsi}</p>
        </div>
      ))}
    </div>
  );
}