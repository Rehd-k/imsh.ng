import { readFileSync } from "node:fs";
import path from "node:path";
import { parseHttpsUrl } from "@/lib/https-url";

export function readStoredLinks(): {
  appStoreUrl: string;
  playStoreUrl: string;
} {
  const configPath = path.join(process.cwd(), "data", "app-download.json");
  try {
    const parsed = JSON.parse(readFileSync(configPath, "utf8")) as {
      appStoreUrl?: unknown;
      playStoreUrl?: unknown;
    };
    return {
      appStoreUrl:
        typeof parsed.appStoreUrl === "string"
          ? (parseHttpsUrl(parsed.appStoreUrl) ?? "")
          : "",
      playStoreUrl:
        typeof parsed.playStoreUrl === "string"
          ? (parseHttpsUrl(parsed.playStoreUrl) ?? "")
          : "",
    };
  } catch {
    return { appStoreUrl: "", playStoreUrl: "" };
  }
}
