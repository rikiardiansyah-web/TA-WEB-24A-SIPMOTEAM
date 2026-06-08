import { prisma } from "@/src/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {

    const { id } = await params;

    const chat = await prisma.chat.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return Response.json(chat);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengambil chat" },
      { status: 500 }
    );
  }
}