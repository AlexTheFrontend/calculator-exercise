import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Retail Calculator",
  description: "Calculate retail order totals with tiered discounts and regional tax rates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
