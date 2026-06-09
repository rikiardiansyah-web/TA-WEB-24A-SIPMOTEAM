import { prisma } from "@/src/lib/prisma";

export async function GET() {
  try {
    const chats = await prisma.chat.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        messages: true,
      },
    });

    return Response.json(chats);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal mengambil chat" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const warga = await prisma.warga.findUnique({
      where: {
        nik: body.nik,
      },
    });

    if (!warga) {
      return Response.json(
        { error: "Warga tidak ditemukan" },
        { status: 404 }
      );
    }

    const existingChat = await prisma.chat.findFirst({
      where: {
        nik: body.nik,
      },
    });

    if (existingChat) {
      return Response.json(existingChat);
    }

    const chat = await prisma.chat.create({
      data: {
        nik: warga.nik,
        username: warga.username || "",
        nama: warga.nama,
      },
    });

    return Response.json(chat);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Gagal membuat chat" },
      { status: 500 }
    );
  }
}