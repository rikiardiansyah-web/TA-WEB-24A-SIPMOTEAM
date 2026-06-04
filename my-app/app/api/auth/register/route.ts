import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const cekWarga = await prisma.warga.findUnique({
      where: {
        nik: body.nik,
      },
    });

    if (!cekWarga) {
      return Response.json({
        success: false,
        error: "Data warga tidak ditemukan",
      });
    }

    if (cekWarga.username) {
      return Response.json({
        success: false,
        error: "Akun sudah pernah dibuat",
      });
    }

    const updateWarga = await prisma.warga.update({
      where: {
        nik: body.nik,
      },
      data: {
        username: body.username,
        password: body.password,
      },
    });

    return Response.json({
      success: true,
      user: updateWarga,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Gagal membuat akun",
      },
      {
        status: 500,
      }
    );
  }
}