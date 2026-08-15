// src/app/layout.tsx

import type {
  Metadata,
  Viewport,
} from "next";

import "leaflet/dist/leaflet.css";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title:
    "Sivanesan A | Full Stack & Mobile Developer",

  description:
    "Sivanesan A is a full stack and mobile developer building secure, scalable web and mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth antialiased"
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
