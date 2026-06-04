import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const warga = await prisma.warga.findFirst({
      where: {
        nik: body.nik,
        nama: body.nama,
      },
    });

    if (!warga) {
      return Response.json({
        success: false,
      });
    }

    return Response.json({
      success: true,
      warga,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false },
      { status: 500 }
    );
  }
}