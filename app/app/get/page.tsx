import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { QrFrame } from "@/components/qr-frame";
import { StoreLinks } from "@/components/store-links";
import { readDownloadConfig } from "@/lib/app-download";
import { deviceKind } from "@/lib/device";
import { appFeatures } from "@/lib/hospital";

export const metadata: Metadata = {
  title: "Get the app",
  description:
    "Download the Ibom Multi-Specialty Hospital patient app. Phones open the App Store or Google Play. Computers can use the store buttons or the QR code.",
};

export default function GetAppPage() {
  return (
    <Suspense fallback={<GetFallback />}>
      <SmartDownload />
    </Suspense>
  );
}

function GetFallback() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
        The patient app
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight text-ink">
        Loading the download page…
      </h1>
    </div>
  );
}

async function SmartDownload() {
  const headerList = await headers();
  const config = await readDownloadConfig();
  const kind = deviceKind(headerList.get("user-agent") ?? "");

  if (kind === "android" && config.playStoreUrl) {
    redirect(config.playStoreUrl);
  }
  if (kind === "apple" && config.appStoreUrl) {
    redirect(config.appStoreUrl);
  }

  const notice =
    kind === "android"
      ? "This is an Android device, and the Play Store link has not been published yet."
      : kind === "apple"
        ? "This is an iPhone or iPad, and the App Store link has not been published yet."
        : null;

  return (
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
          The patient app
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-tight text-ink md:text-6xl">
          Get IMSH on your phone.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          On a phone, this page opens the App Store or Google Play. On a
          computer, use the buttons or scan the QR code. Patients sign in with
          their hospital patient ID and date of birth.
        </p>
        {notice ? (
          <p className="mt-6 max-w-xl rounded-2xl border border-gold bg-white px-5 py-4 text-ink">
            {notice}
          </p>
        ) : null}
        <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {appFeatures.map((feature) => (
            <li key={feature.title}>
              <p className="font-semibold text-ink">{feature.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                {feature.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <aside className="rounded-[2rem] border border-line bg-white p-8">
        <div className="flex justify-center">
          <QrFrame
            hasQr={config.hasQr}
            updatedAt={config.qrUpdatedAt}
            caption="This code opens this page."
          />
        </div>
        <div className="mt-6">
          <StoreLinks
            appStoreUrl={config.appStoreUrl}
            playStoreUrl={config.playStoreUrl}
          />
        </div>
      </aside>
    </div>
  );
}
