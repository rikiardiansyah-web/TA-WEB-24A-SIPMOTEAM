import { prisma } from "@/src/lib/prisma";

export async function POST(req: Request) {
  try {

    const {
      username,
      password,
    } = await req.json();

    const admin =
      await prisma.admin.findUnique({
        where: {
          username,
        },
      });

    if (!admin) {
      return Response.json(
        {
          error: "Admin tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    if (admin.password !== password) {
      return Response.json(
        {
          error: "Password salah",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(admin);

  } catch (error) {

    return Response.json(
      {
        error: "Login gagal",
      },
      {
        status: 500,
      }
    );

  }
}