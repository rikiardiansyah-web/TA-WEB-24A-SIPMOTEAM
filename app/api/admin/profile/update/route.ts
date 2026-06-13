import { prisma } from "@/src/lib/prisma";

export async function PATCH(
  req: Request
) {

  const body =
    await req.json();

  const admin =
    await prisma.admin.update({
      where: {
        id: body.id,
      },
      data: {
        nama: body.nama,
        username: body.username,
        email: body.email,
        noHp: body.noHp,
        fotoProfil: body.fotoProfil,
      },
    });

  return Response.json(admin);
}