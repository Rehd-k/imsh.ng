"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { hospital, navLinks } from "@/lib/hospital";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/80 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/imsh.png"
            alt=""
            width={112}
            height={112}
            priority
            className="h-14 w-14 shrink-0 rounded-md bg-black object-contain"
          />
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg leading-none text-white">
              {hospital.shortName}
            </span>
            <span className="mt-1 block truncate text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/70">
              Multi-Specialty Hospital
            </span>
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`text-sm font-semibold tracking-wide ${
                  active ? "text-gold" : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/app/get"
          className="ml-auto hidden rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-deep sm:inline-flex lg:ml-2"
        >
          Get the app
        </Link>

        <button
          type="button"
          className="ml-auto rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white sm:ml-0 lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="site-menu"
          className="border-t border-white/10 px-5 py-3 lg:hidden"
          aria-label="Primary"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`block py-3 text-base font-semibold ${
                  active ? "text-gold" : "text-white"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/app/get"
            className="mt-2 inline-flex rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-ink sm:hidden"
            onClick={() => setOpen(false)}
          >
            Get the app
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
