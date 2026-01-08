import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

import NextAuthProvider from "@/app/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Hills club",
  description: "نادى جرين هيلز الرياضي",
  icons: {
    icon: ["/static/favicon.ico?v=4"],
    apple: ["/static/apple-touch-icon.png?v=4"],
    shortcut: ["/static/apple-touch-icon.png"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <NextAuthProvider>
        <body className={inter.className}>
          <div className="h-[100%] min-h-screen bg-slate-200">
            <div className="sticky top-0 z-20">
              <Navbar />
            </div>

            <div className="container w-[95%] sm:w-[100%] mt-4 mx-auto ">
              {children}
            </div>
          </div>
        </body>
      </NextAuthProvider>
    </html>
  );
}
