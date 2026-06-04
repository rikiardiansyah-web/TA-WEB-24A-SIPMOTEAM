import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const warga = await prisma.warga.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

    if (!warga) {
      return Response.json({
        success: false,
        error: "Username atau Password salah",
      });
    }

    return Response.json({
      success: true,
      user: warga,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Terjadi kesalahan",
      },
      {
        status: 500,
      }
    );
  }
}