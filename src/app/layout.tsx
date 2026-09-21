import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Auto Store",
    template: "%s | Auto Store",
  },
  description:
    "Véhicules d'occasion disponibles au Congo, en transit ou à l'importation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
