import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SangeetHub — Music, without the clutter",
  description: "A lightweight browser music player with search, favorites, personal playlists, and an automatic related-track queue.",
  applicationName: "SangeetHub",
  appleWebApp: {
    capable: true,
    title: "SangeetHub",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#101014",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
