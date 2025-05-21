import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
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
          <nav className="mb-8">
            <ul className="flex space-x-4">
              <li><Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</Link></li>
              <li><Link href="/cv" className="text-blue-600 dark:text-blue-400 hover:underline">CV</Link></li>
              {/* <li><Link href="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">Blog</Link></li> */}
            </ul>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
