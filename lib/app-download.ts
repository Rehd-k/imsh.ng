import { io } from "next/cache";
import { access, copyFile, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseHttpsUrl } from "@/lib/https-url";

export { parseHttpsUrl };

const dataDir = path.join(process.cwd(), "data");
const configPath = path.join(dataDir, "app-download.json");
const qrPath = path.join(dataDir, "qr.png");

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

export const MAX_QR_BYTES = 2 * 1024 * 1024;

export type DownloadConfig = {
  appStoreUrl: string;
  playStoreUrl: string;
  qrUpdatedAt: string | null;
  hasQr: boolean;
};

type StoredConfig = {
  appStoreUrl: string;
  playStoreUrl: string;
  qrUpdatedAt: string | null;
};

function storedHttps(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    return "";
  }
  return parseHttpsUrl(value) ?? "";
}

function isMissingFile(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch (error) {
    if (isMissingFile(error)) {
      return false;
    }
    throw error;
  }
}

export async function readDownloadConfig(): Promise<DownloadConfig> {
  await io();

  let parsed: Partial<StoredConfig> = {};
  try {
    const raw = await readFile(configPath, "utf8");
    parsed = JSON.parse(raw) as Partial<StoredConfig>;
  } catch (error) {
    if (!isMissingFile(error) && !(error instanceof SyntaxError)) {
      throw error;
    }
  }

  const hasQr = await fileExists(qrPath);
  return {
    appStoreUrl: storedHttps(parsed.appStoreUrl),
    playStoreUrl: storedHttps(parsed.playStoreUrl),
    qrUpdatedAt:
      typeof parsed.qrUpdatedAt === "string" ? parsed.qrUpdatedAt : null,
    hasQr,
  };
}

export async function readQrBytes(): Promise<Buffer | null> {
  try {
    return await readFile(qrPath);
  } catch (error) {
    if (isMissingFile(error)) {
      return null;
    }
    throw error;
  }
}

export function isPng(bytes: Buffer): boolean {
  return (
    bytes.length >= PNG_SIGNATURE.length &&
    bytes.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)
  );
}

async function writeAtomic(filePath: string, data: Buffer | string) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.${process.pid}.tmp`;
  await writeFile(temporary, data);
  await copyFile(temporary, filePath);
  await rm(temporary, { force: true });
}

export async function writeDownloadConfig(config: StoredConfig) {
  await writeAtomic(`${configPath}`, `${JSON.stringify(config, null, 2)}\n`);
}

export async function writeQr(bytes: Buffer) {
  await writeAtomic(qrPath, bytes);
}
