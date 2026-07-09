import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../src/layouts/header";
import Sidebar from "../src/layouts/sidebar";
import MainContent from "../src/layouts/main-content";
import Footer from "../src/layouts/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Backend Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <MainContent>{children}</MainContent>
        </div>
        <Footer />
      </body>
    </html>
  );
}