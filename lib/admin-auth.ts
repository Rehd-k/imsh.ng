import { timingSafeEqual } from "node:crypto";

const PASSWORD = process.env.ADMIN_UPLOAD_PASSWORD ?? "vesselinc";

export function passwordMatches(input: string): boolean {
  const given = Buffer.from(input);
  const expected = Buffer.from(PASSWORD);

  if (given.length !== expected.length) {
    timingSafeEqual(expected, expected);
    return false;
  }

  return timingSafeEqual(given, expected);
}
