import {
  isPng,
  MAX_QR_BYTES,
  parseHttpsUrl,
  readDownloadConfig,
  writeDownloadConfig,
  writeQr,
} from "@/lib/app-download";
import { passwordMatches } from "@/lib/admin-auth";
import {
  clearFailures,
  isRateLimited,
  recordFailure,
} from "@/lib/rate-limit";
import type { UploadStatus } from "@/lib/upload-status";

export async function saveDownload(
  formData: FormData,
  ip: string,
): Promise<UploadStatus> {
  if (isRateLimited(ip)) {
    return "rate";
  }

  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    recordFailure(ip);
    return isRateLimited(ip) ? "rate" : "password";
  }

  clearFailures(ip);

  const current = await readDownloadConfig();
  let appStoreUrl = current.appStoreUrl;
  let playStoreUrl = current.playStoreUrl;
  let qrUpdatedAt = current.qrUpdatedAt;
  let changed = false;

  const appStoreRaw = String(formData.get("appStoreUrl") ?? "");
  if (appStoreRaw.trim()) {
    const parsed = parseHttpsUrl(appStoreRaw);
    if (!parsed) {
      return "appstore";
    }
    if (parsed !== appStoreUrl) {
      appStoreUrl = parsed;
      changed = true;
    }
  }

  const playStoreRaw = String(formData.get("playStoreUrl") ?? "");
  if (playStoreRaw.trim()) {
    const parsed = parseHttpsUrl(playStoreRaw);
    if (!parsed) {
      return "playstore";
    }
    if (parsed !== playStoreUrl) {
      playStoreUrl = parsed;
      changed = true;
    }
  }

  const file = formData.get("qr");
  let pngBytes: Buffer | null = null;
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_QR_BYTES) {
      return "size";
    }
    pngBytes = Buffer.from(await file.arrayBuffer());
    if (!isPng(pngBytes)) {
      return "png";
    }
    qrUpdatedAt = new Date().toISOString();
    changed = true;
  }

  if (!changed) {
    return "unchanged";
  }

  if (pngBytes) {
    await writeQr(pngBytes);
  }

  await writeDownloadConfig({
    appStoreUrl,
    playStoreUrl,
    qrUpdatedAt,
  });

  return "ok";
}
