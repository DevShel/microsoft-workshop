import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Group Web App",
  description: "A simple full-stack demo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
