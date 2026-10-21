import type { Metadata } from "next";
import { Newsreader, Source_Sans_3 } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { hospitalJsonLd, siteDescription } from "@/lib/hospital";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-newsreader",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imsh.ng"),
  title: {
    default: "Ibom Multi-Specialty Hospital",
    template: "%s · IMSH",
  },
  description: siteDescription,
  icons: {
    icon: "/brand/imsh.png",
  },
  openGraph: {
    title: "Ibom Multi-Specialty Hospital",
    description: siteDescription,
    siteName: "Ibom Multi-Specialty Hospital",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a className="skip" href="#content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(hospitalJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
