import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Wu Tang Name Generator",
  description: "Get your personalized Wu-Tang name in seconds! Inspired by the legendary Wu-Tang Clan, this generator combines style, creativity, and a touch of martial arts mystique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-white dark:bg-black`}>
        {children}
      </body>
    </html>
  );
}
