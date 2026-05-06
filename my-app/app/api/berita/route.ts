import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.berita.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(data);
  } catch (error) {
    console.error("Get berita error:", error);
    return Response.json({ error: "Gagal mengambil berita" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await prisma.berita.create({
      data: {
        judul: body.judul,
        deskripsi: body.deskripsi,
      },
    });

    return Response.json(data);
  } catch (error) {
    console.error("Create berita error:", error);
    return Response.json({ error: "Gagal membuat berita" }, { status: 500 });
  }
}