import { prisma } from "@/src/lib/prisma";

export async function GET() {
  const data = await prisma.aktivitas.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(data);
}

export async function POST(
  req: Request
) {
  const body = await req.json();

  const aktivitas =
    await prisma.aktivitas.create({
      data: {
        aktivitas:
          body.aktivitas,
      },
    });

  return Response.json(
    aktivitas
  );
}
