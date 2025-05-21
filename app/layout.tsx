import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Misha Chernetsov",
  description: "Personal website and CV",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </div>
      </body>
    </html>
  );
}
