export function parseHttpsUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.length > 2000) {
    return null;
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") {
    return null;
  }
  if (url.username || url.password) {
    return null;
  }

  return url.toString();
}
