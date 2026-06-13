import { prisma } from "@/src/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return Response.json(
        { error: "ID wajib diisi" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.update({
      where: {
        id: body.id,
      },
      data: {
        nama: body.nama,
        username: body.username,
        email: body.email,
        noHp: body.noHp,
        fotoProfil: body.fotoProfil,
      },
    });

    return Response.json({
      success: true,
      data: admin,
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        error: "Gagal update admin",
      },
      { status: 500 }
    );
  }
}