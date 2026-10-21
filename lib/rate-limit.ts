type Bucket = {
  failures: number;
  resetAt: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 8;
const buckets = new Map<string, Bucket>();

export function clientAddress(headerList: Headers): string {
  const forwarded = headerList.get("x-forwarded-for");
  const raw =
    forwarded?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "local";
  return raw.slice(0, 80);
}

export function isRateLimited(key: string): boolean {
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < Date.now()) {
    return false;
  }
  return bucket.failures >= MAX_FAILURES;
}

export function recordFailure(key: string): void {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { failures: 1, resetAt: now + WINDOW_MS });
    return;
  }
  bucket.failures += 1;
}

export function clearFailures(key: string): void {
  buckets.delete(key);
}
