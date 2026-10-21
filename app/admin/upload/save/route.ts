import { NextResponse, type NextRequest } from "next/server";
import { saveDownload } from "@/lib/save-download";
import { clientAddress } from "@/lib/rate-limit";
import { isUploadStatus, type UploadStatus } from "@/lib/upload-status";

function redirectWithStatus(request: NextRequest, status: UploadStatus) {
  const next = request.nextUrl.clone();
  next.pathname = "/admin/upload";
  next.search = "";
  next.searchParams.set("status", status);
  return NextResponse.redirect(next, 303);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const status = await saveDownload(
      formData,
      clientAddress(request.headers),
    );
    return redirectWithStatus(request, status);
  } catch (error) {
    console.error("App download update failed", error);
    return redirectWithStatus(request, "failed");
  }
}

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status");
  if (status && isUploadStatus(status)) {
    return redirectWithStatus(request, status);
  }
  return NextResponse.redirect(new URL("/admin/upload", request.url), 303);
}
