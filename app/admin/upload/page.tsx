import type { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense } from "react";
import { QrFrame } from "@/components/qr-frame";
import { readDownloadConfig } from "@/lib/app-download";
import { isUploadStatus, uploadStatuses } from "@/lib/upload-status";

export const metadata: Metadata = {
  title: "Upload app links",
  robots: { index: false, follow: false },
};

export default function AdminUploadPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  return (
    <Suspense fallback={<AdminFallback />}>
      <AdminPanel searchParams={searchParams} />
    </Suspense>
  );
}

function AdminFallback() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <h1 className="font-serif text-4xl text-ink">Loading the current links…</h1>
    </div>
  );
}

async function AdminPanel({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const [params, config, headerList] = await Promise.all([
    searchParams,
    readDownloadConfig(),
    headers(),
  ]);
  const host =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "imsh.ng";
  const forwardedProto = headerList.get("x-forwarded-proto");
  const protocol =
    forwardedProto ?? (host.startsWith("localhost") ? "http" : "https");
  const target = `${protocol}://${host}/app/get`;
  const status = params.status && isUploadStatus(params.status)
    ? uploadStatuses[params.status]
    : null;

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
        Admin
      </p>
      <h1 className="mt-3 font-serif text-5xl tracking-tight text-ink">
        Update the app links
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        Every save asks for the password. Leave a link blank, or skip the
        image, to keep what is already published.
      </p>

      <div className="mt-8 rounded-3xl bg-ink px-5 py-5 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          Encode this address in the QR code
        </p>
        <code className="mt-3 block font-mono text-sm break-all text-gold">
          {target}
        </code>
      </div>

      {status ? (
        <p
          role="status"
          className={`mt-6 rounded-2xl px-5 py-4 text-sm font-semibold ${
            status.tone === "ok"
              ? "bg-leaf/10 text-leaf"
              : "bg-red-50 text-red-900"
          }`}
        >
          {status.text}
        </p>
      ) : null}

      <section className="mt-8 rounded-3xl border border-line bg-white p-6">
        <h2 className="font-serif text-2xl text-ink">Currently published</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-semibold text-ink">App Store</dt>
            <dd className="mt-1 break-all text-muted">
              {config.appStoreUrl || "Not set"}
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Google Play</dt>
            <dd className="mt-1 break-all text-muted">
              {config.playStoreUrl || "Not set"}
            </dd>
          </div>
        </dl>
        <div className="mt-6">
          <QrFrame hasQr={config.hasQr} updatedAt={config.qrUpdatedAt} />
        </div>
      </section>

      <form
        className="mt-8 space-y-6"
        action="/admin/upload/save"
        method="post"
        encType="multipart/form-data"
      >
        <label className="block">
          <span className="text-sm font-semibold text-ink">Password</span>
          <input
            className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">App Store link</span>
          <input
            className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink"
            name="appStoreUrl"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://apps.apple.com/…"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-ink">Play Store link</span>
          <input
            className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-ink"
            name="playStoreUrl"
            type="url"
            inputMode="url"
            autoComplete="off"
            placeholder="https://play.google.com/…"
          />
        </label>
        <label className="block rounded-3xl border border-dashed border-line bg-paper-deep p-5">
          <span className="block text-sm font-semibold text-ink">
            QR code PNG
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-muted">
            PNG only, up to 2 MB. Leave this empty to keep the current image.
          </span>
          <input
            className="mt-4 block w-full text-sm"
            name="qr"
            type="file"
            accept="image/png,.png"
          />
        </label>
        <button
          className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-deep"
          type="submit"
        >
          Save update
        </button>
      </form>
    </div>
  );
}
