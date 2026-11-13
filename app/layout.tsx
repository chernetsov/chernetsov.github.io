import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/app/contexts/ThemeContext";
import { SiteNav } from "@/app/components/SiteNav";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${michroma.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
        <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="4b8195ad-8e01-4b8c-87c5-852a7ebd4ec6"></script>
      </head>
      <body className="relative min-h-screen overflow-x-hidden">
        <ThemeProvider>
          <SiteNav />
          <main className="site-main relative z-10 mx-auto max-w-3xl px-5 pb-32 pt-28 sm:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
