import { prisma } from "@/src/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    const pengajuan = await prisma.pengajuan.update({
      where: {
        id: body.id,
      },
      data: {
        status: body.status,
        pdfUrl: body.pdfUrl || null,
      },
    });

    return Response.json(pengajuan);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal update status" },
      { status: 500 }
    );
  }
}