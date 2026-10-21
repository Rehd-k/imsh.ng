import { connection, NextResponse } from "next/server";
import { readQrBytes } from "@/lib/app-download";

export async function GET() {
  await connection();
  const bytes = await readQrBytes();
  if (!bytes) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
