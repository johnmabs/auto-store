import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, Playfair_Display } from "next/font/google";

import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Auto Store",
    template: "%s | Auto Store",
  },

  description:
    "Véhicules d'occasion disponibles au Congo, en transit ou à l'importation.",
};

const themeScript = `
(() => {
  try {
    const key = "auto-store-theme";

    const stored =
      localStorage.getItem(key);

    const preference =
      stored === "light" ||
      stored === "dark" ||
      stored === "system"
        ? stored
        : "system";

    const system =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches
        ? "light"
        : "dark";

    const resolved =
      preference === "system"
        ? system
        : preference;

    const root =
      document.documentElement;

    root.classList.remove(
      "light",
      "dark"
    );

    root.classList.add(
      resolved
    );

    root.dataset.theme =
      resolved;

    root.dataset.themePreference =
      preference;
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} ${playfairDisplay.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
