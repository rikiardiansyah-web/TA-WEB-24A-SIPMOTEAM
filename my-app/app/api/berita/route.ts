import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const data = await prisma.berita.create({
    data: {
      judul: body.judul,
      deskripsi: body.deskripsi,
    },
  });

  return Response.json(data);
}

export async function GET() {
  const data = await prisma.berita.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(data);
}