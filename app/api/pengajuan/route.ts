import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {

    const pengajuan = await prisma.pengajuan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(pengajuan);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal mengambil pengajuan" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const pengajuan =
      await prisma.pengajuan.create({
        data: {
          nik: body.nik,
          nama: body.nama,
          judul: body.judul,
          deskripsi: body.deskripsi,
          fileUrl: body.fileUrl,
        },
      });

    return Response.json(pengajuan);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal membuat pengajuan" },
      { status: 500 }
    );
  }
}