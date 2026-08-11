import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sivanesan A | Full Stack & Mobile Developer",
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
      className={`${sora.variable} ${manrope.variable} scroll-smooth antialiased`}
    >
      <head>
        <meta name="theme-color" content="#07080d" />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}