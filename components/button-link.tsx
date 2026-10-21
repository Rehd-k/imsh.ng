import Link from "next/link";
import type { ComponentProps } from "react";

const styles = {
  gold: "inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep",
  navy: "inline-flex items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink",
  ghost:
    "inline-flex items-center justify-center rounded-full border border-ink/15 bg-white/40 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-white",
} as const;

export function ButtonLink({
  variant = "navy",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof styles }) {
  return (
    <Link {...props} className={`${styles[variant]} ${className}`.trim()} />
  );
}
