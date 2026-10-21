export const uploadStatuses = {
  ok: {
    tone: "ok",
    text: "Saved. The site is now using this update.",
  },
  unchanged: {
    tone: "ok",
    text: "Nothing new was sent. The current links and image are unchanged.",
  },
  password: {
    tone: "error",
    text: "That password is not correct. Nothing was changed.",
  },
  rate: {
    tone: "error",
    text: "Too many attempts. Wait a few minutes and try again.",
  },
  appstore: {
    tone: "error",
    text: "The App Store link must be a full https address.",
  },
  playstore: {
    tone: "error",
    text: "The Play Store link must be a full https address.",
  },
  png: {
    tone: "error",
    text: "The QR file must be a PNG image.",
  },
  size: {
    tone: "error",
    text: "The QR image must be 2 MB or smaller.",
  },
  failed: {
    tone: "error",
    text: "The update could not be saved. Try again.",
  },
} as const;

export type UploadStatus = keyof typeof uploadStatuses;

export function isUploadStatus(value: string): value is UploadStatus {
  return Object.prototype.hasOwnProperty.call(uploadStatuses, value);
}
