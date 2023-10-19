import Providers from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Koinos Block Explorer",
  description: "Koinos Block Explorer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen max-h-screen overflow-hidden font-inter bg-almost-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
