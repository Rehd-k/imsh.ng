import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl tracking-tight text-ink">
        This page is not on the hospital site.
      </h1>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
        The address may be mistyped. The front door, the services, and the
        patient app are still here.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white hover:bg-ink"
      >
        Back to the home page
      </Link>
    </div>
  );
}
