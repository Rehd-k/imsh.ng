export type DeviceKind = "android" | "apple" | "other";

export function deviceKind(userAgent: string): DeviceKind {
  const ua = userAgent.toLowerCase();

  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ipod")) {
    return "apple";
  }

  // iPadOS reports a Macintosh user agent and still includes Mobile.
  if (ua.includes("macintosh") && ua.includes("mobile")) {
    return "apple";
  }

  if (ua.includes("android")) {
    return "android";
  }

  return "other";
}
