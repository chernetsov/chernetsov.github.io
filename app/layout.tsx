import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { ThemeSwitcher } from "@/app/components/ThemeSwitcher";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="4b8195ad-8e01-4b8c-87c5-852a7ebd4ec6"></script>
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider>
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
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
