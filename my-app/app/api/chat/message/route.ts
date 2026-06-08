import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const message = await prisma.message.create({
      data: {
        chatId: body.chatId,
        pengirim: body.pengirim,
        isi: body.isi,
      },
    });

    await prisma.chat.update({
      where: {
        id: body.chatId,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return Response.json(message);

  } catch (error) {

    console.error(error);

    return Response.json(
      { error: "Gagal mengirim pesan" },
      { status: 500 }
    );
  }
}