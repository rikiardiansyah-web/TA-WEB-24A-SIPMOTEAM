import { prisma } from "@/src/lib/prisma";

export async function PUT(req: Request) {
  try {

    const body = await req.json();

    await prisma.message.updateMany({
      where: {
        chatId: body.chatId,
        pengirim: "admin",
        dibaca: false,
      },
      data: {
        dibaca: true,
      },
    });

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal update status" },
      { status: 500 }
    );
  }
}