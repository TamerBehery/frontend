import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Hills club",
  description: "Generated by Microsolution",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
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
      <body className={inter.className}>
        <div className="min-h-screen bg-slate-200">
          <div className="sticky top-0 z-10">
            <Navbar />
          </div>

          <div className="container w-[95%] sm:w-[100%] mt-4 mx-auto ">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
