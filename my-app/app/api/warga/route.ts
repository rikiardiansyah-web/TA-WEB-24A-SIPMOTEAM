import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {

    const data = await prisma.warga.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(data);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal mengambil data warga" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const data = await prisma.warga.create({
      data: {
        nik: body.nik,
        username: body.username,
        nama: body.nama,
        email: body.email,
        password: body.password,
        noTelepon: body.noTelepon,
        alamat: body.alamat,
        JenisKelamin: body.JenisKelamin,
        status: body.status,
      },
    });

    return Response.json(data);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal menambah warga" },
      { status: 500 }
    );
  }
}