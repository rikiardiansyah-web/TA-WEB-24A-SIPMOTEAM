import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {

  const { searchParams } =
    new URL(req.url);

  const id =
    Number(
      searchParams.get("id")
    );

  const admin =
    await prisma.admin.findUnique({
      where: {
        id,
      },
    });

  return Response.json(admin);
}