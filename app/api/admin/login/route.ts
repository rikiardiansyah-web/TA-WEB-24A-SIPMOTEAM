import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === "admin" &&
    password === "admin123"
  ) {
    return NextResponse.json({
      id: 1,
      username: "admin",
      role: "admin",
    });
  }

  return NextResponse.json(
    {
      error: "Username atau password salah",
    },
    {
      status: 401,
    }
  );
}