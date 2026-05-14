import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.pesan.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(data);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengambil pesan" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cekWarga = await prisma.warga.findUnique({
      where: {
        nik: Number(body.nik),
      },
    });

    if (!cekWarga) {
      return Response.json(
        {
          error: "NIK tidak terdaftar sebagai warga",
        },
        {
          status: 400,
        }
      );
    }

    const data = await prisma.pesan.create({
      data: {
        nik: Number(body.nik),
        nama: cekWarga.name,
        isi: body.isi,
      },
    });

    return Response.json(data);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}