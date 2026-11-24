import { IphoneReviewWait } from "@/components/iphone-review-wait";

export function StoreLinks({
  appStoreUrl,
  playStoreUrl,
  tone = "paper",
}: {
  appStoreUrl: string;
  playStoreUrl: string;
  tone?: "paper" | "ink";
}) {
  const appClass =
    tone === "ink"
      ? "inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold"
      : "inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy";
  const playClass =
    tone === "ink"
      ? "inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep"
      : "inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink";

  if (appStoreUrl) {
    return (
      <div className="flex flex-wrap gap-3">
        <a className={appClass} href={appStoreUrl} rel="noopener noreferrer">
          App Store
        </a>
        {playStoreUrl ? (
          <a className={playClass} href={playStoreUrl} rel="noopener noreferrer">
            Google Play
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <IphoneReviewWait tone={tone} />
      {playStoreUrl ? (
        <a className={playClass} href={playStoreUrl} rel="noopener noreferrer">
          Google Play
        </a>
      ) : null}
    </div>
  );
}
