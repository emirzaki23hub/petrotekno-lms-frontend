import type { Metadata } from "next";
import { Titillium_Web as FontSans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Petrotekno - Technical School",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "700"],
});

const fontMono = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen  bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
