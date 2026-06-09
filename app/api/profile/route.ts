import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const nik = searchParams.get("nik");

    if (!nik) {
      return Response.json(
        { error: "NIK wajib diisi" },
        { status: 400 }
      );
    }

    const warga = await prisma.warga.findUnique({
      where: {
        nik,
      },
    });

    if (!warga) {
      return Response.json(
        { error: "Warga tidak ditemukan" },
        { status: 404 }
      );
    }

    return Response.json(warga);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengambil profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const warga = await prisma.warga.update({
      where: {
        nik: body.nik,
      },

      data: {
        username: body.username,
        email: body.email,
        noTelepon: body.noTelepon,
        password: body.password,
        fotoProfil: body.fotoProfil,
      },
    });

    return Response.json({
      success: true,
      data: warga,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Gagal update profile",
      },
      {
        status: 500,
      }
    );
  }
}