"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "imsh-iphone-review-started";
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;
const MESSAGE_MS = 8000;

const REVIEW_MESSAGES = [
  "Apple is making sure the app works smoothly on iPhone.",
  "Apple is checking that the app’s security is strong enough for patients.",
  "Apple is reviewing IMSH before it appears in the App Store.",
  "Apple is confirming the app is ready for you to download.",
];

const ZERO_MESSAGE =
  "Apple is still finishing its review. The iPhone download will show here as soon as it is approved.";

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function remainingFrom(startedAt: number, now: number): Remaining {
  const left = Math.max(0, startedAt + FIVE_DAYS_MS - now);
  const totalSeconds = Math.floor(left / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function isFinished(remaining: Remaining): boolean {
  return (
    remaining.days === 0 &&
    remaining.hours === 0 &&
    remaining.minutes === 0 &&
    remaining.seconds === 0
  );
}

function readStartedAt(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? Number(raw) : Number.NaN;
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  } catch {
    // Private browsing can block storage. The clock still runs for this visit.
  }

  const started = Date.now();
  try {
    window.localStorage.setItem(STORAGE_KEY, String(started));
  } catch {
    // Ignore a blocked write and keep the in-memory start time.
  }
  return started;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export function IphoneReviewWait({
  tone = "paper",
}: {
  tone?: "paper" | "ink";
}) {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const started = readStartedAt();
    setStartedAt(started);
    setNow(Date.now());
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(tick);
  }, []);

  const ready = startedAt !== null && now !== null;
  const remaining = ready ? remainingFrom(startedAt, now) : null;
  const finished = remaining !== null && isFinished(remaining);

  useEffect(() => {
    if (!ready || finished) {
      return;
    }
    const rotate = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % REVIEW_MESSAGES.length);
    }, MESSAGE_MS);
    return () => window.clearInterval(rotate);
  }, [ready, finished]);

  const ink = tone === "ink";
  const cardClass = ink
    ? "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-4 text-white"
    : "w-full rounded-2xl border border-line bg-white px-4 py-4 text-ink";
  const labelClass = ink
    ? "text-xs font-semibold uppercase tracking-[0.18em] text-gold"
    : "text-xs font-semibold uppercase tracking-[0.18em] text-navy";
  const unitClass = ink ? "text-white/60" : "text-muted";
  const message =
    remaining === null
      ? "Checking Apple’s review…"
      : finished
        ? ZERO_MESSAGE
        : REVIEW_MESSAGES[messageIndex];

  return (
    <div className={cardClass} aria-live="polite">
      <p className={labelClass}>iPhone</p>
      {remaining ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          <TimeUnit label="Days" value={pad(remaining.days)} mutedClass={unitClass} />
          <TimeUnit label="Hours" value={pad(remaining.hours)} mutedClass={unitClass} />
          <TimeUnit
            label="Minutes"
            value={pad(remaining.minutes)}
            mutedClass={unitClass}
          />
          <TimeUnit
            label="Seconds"
            value={pad(remaining.seconds)}
            mutedClass={unitClass}
          />
        </div>
      ) : (
        <p className="mt-3 font-serif text-2xl tracking-tight">5 days</p>
      )}
      <p className={`mt-3 text-sm leading-relaxed ${unitClass}`}>{message}</p>
    </div>
  );
}

function TimeUnit({
  label,
  value,
  mutedClass,
}: {
  label: string;
  value: string;
  mutedClass: string;
}) {
  return (
    <div>
      <p className="font-serif text-2xl tracking-tight tabular-nums">{value}</p>
      <p className={`mt-1 text-[0.7rem] uppercase tracking-[0.12em] ${mutedClass}`}>
        {label}
      </p>
    </div>
  );
}
