import { NextResponse, type NextRequest } from "next/server";
import { deviceKind } from "@/lib/device";
import { readStoredLinks } from "@/lib/stored-links";

export function proxy(request: NextRequest) {
  const kind = deviceKind(request.headers.get("user-agent") ?? "");
  if (kind === "other") {
    return NextResponse.next();
  }

  const links = readStoredLinks();
  const destination =
    kind === "android" ? links.playStoreUrl : links.appStoreUrl;
  if (!destination) {
    return NextResponse.next();
  }

  const response = NextResponse.redirect(destination, 302);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/app/get", "/app/get/"],
};
