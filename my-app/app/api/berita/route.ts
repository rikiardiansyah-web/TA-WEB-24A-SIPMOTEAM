import { prisma } from "@/src/lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const data = await prisma.berita.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json(data);
  } catch (error) {
    console.error("Get berita error:", error);

    return Response.json(
      { error: "Gagal mengambil berita" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const judul = formData.get("judul") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const file = formData.get("gambar") as File;

    let namaFile = "";

    console.log("Judul:", judul);
    console.log("Deskripsi:", deskripsi);
    console.log("File:", file);

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      namaFile = `${Date.now()}-${file.name}`;

      console.log("Nama File:", namaFile);

      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        namaFile
      );

      await writeFile(uploadPath, buffer);
    }

    const data = await prisma.berita.create({
      data: {
        judul,
        deskripsi,
        gambar: `/uploads/${namaFile}`,
      },
    });

    return Response.json(data);

  } catch (error) {
    console.error("Create berita error:", error);

    return Response.json(
      { error: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    await prisma.berita.delete({
      where: {
        id: body.id,
      },
    });

    return Response.json({
      message: "Berita berhasil dihapus",
    });

  } catch (error) {
    console.error("Delete berita error:", error);

    return Response.json(
      { error: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();

    const id = Number(formData.get("id"));
    const judul = formData.get("judul") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const file = formData.get("gambar") as File;

    const dataUpdate: {
      judul: string;
      deskripsi: string;
      gambar?: string;
    } = {
      judul,
      deskripsi,
    };

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const namaFile = `${Date.now()}-${file.name}`;

      const uploadPath = path.join(
        process.cwd(),
        "public/uploads",
        namaFile
      );

      await writeFile(uploadPath, buffer);

      dataUpdate.gambar = `/uploads/${namaFile}`;
    }

    const data = await prisma.berita.update({
      where: {
        id,
      },
      data: dataUpdate,
    });

    return Response.json(data);

  } catch (error) {
    console.error("Update berita error:", error);

    return Response.json(
      { error: "Gagal update berita" },
      { status: 500 }
    );
  }
}