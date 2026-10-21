import Image from "next/image";

export function QrFrame({
  hasQr,
  updatedAt,
  caption = "Scan with a phone camera.",
}: {
  hasQr: boolean;
  updatedAt: string | null;
  caption?: string;
}) {
  if (!hasQr) {
    return (
      <div className="flex aspect-square w-full max-w-[220px] items-center justify-center border border-dashed border-line bg-paper px-6 text-center text-sm leading-relaxed text-muted">
        The QR code will appear here after it is uploaded.
      </div>
    );
  }

  const version = updatedAt ?? "current";

  return (
    <figure className="w-full max-w-[220px]">
      <Image
        src={`/media/qr?v=${encodeURIComponent(version)}`}
        alt="QR code that opens the IMSH app download page"
        width={440}
        height={440}
        unoptimized
        className="h-auto w-full bg-white"
      />
      <figcaption className="mt-3 text-center text-sm text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
