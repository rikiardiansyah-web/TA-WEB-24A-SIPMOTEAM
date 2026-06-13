import { prisma } from "@/src/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = Number(searchParams.get("id"));

  if (!id) {
    return Response.json(
      { error: "ID tidak valid" },
      { status: 400 }
    );
  }

  const admin = await prisma.admin.findUnique({
    where: { id },
  });

  if (!admin) {
    return Response.json(
      { error: "Admin tidak ditemukan" },
      { status: 404 }
    );
  }

  return Response.json(admin);
}
