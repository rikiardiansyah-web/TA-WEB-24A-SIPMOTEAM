import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.formData();

    const file = data.get("file") as File;

    if (!file) {
      return Response.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName =
      Date.now() + "-" + file.name;

    const filePath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    );

    await writeFile(
      filePath,
      buffer
    );

    return Response.json({
      url: `/uploads/${fileName}`,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Upload gagal" },
      { status: 500 }
    );
  }
}