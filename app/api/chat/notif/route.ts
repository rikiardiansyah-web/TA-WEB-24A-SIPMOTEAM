import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  try {

    const { searchParams } =
      new URL(req.url);

    const chatId = Number(
      searchParams.get("chatId")
    );

    const total = await prisma.message.count({
      where: {
        chatId,
        pengirim: "admin",
        dibaca: false,
      },
    });

    return Response.json({
      total,
    });

  } catch (error) {

    console.error(error);

    return Response.json(
      { total: 0 },
      { status: 500 }
    );
  }
}