import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const { id } =
      await params;

    const pengajuan =
      await prisma.pengajuan.findUnique({
        where: {
          id: Number(id),
        },
      });

    return Response.json(pengajuan);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal mengambil detail pengajuan" },
      { status: 500 }
    );
  }
}
export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {

    const body =
      await req.json();

    const { id } =
      await params;

    const pengajuan =
      await prisma.pengajuan.update({
        where: {
          id: Number(id),
        },
        data: {
          status: body.status,
          dibacaAdmin:
            body.dibacaAdmin,
          pdfUrl:
            body.pdfUrl,
        },
      });

    return Response.json(
      pengajuan
    );

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal update pengajuan" },
      { status: 500 }
    );
  }
}