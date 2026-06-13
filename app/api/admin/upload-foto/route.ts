import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName =
      Date.now() + "-" + file.name.replaceAll(" ", "-");

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/admin"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const filePath = path.join(
      uploadDir,
      fileName
    );

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      url: `/uploads/admin/${fileName}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload gagal" },
      { status: 500 }
    );
  }
}