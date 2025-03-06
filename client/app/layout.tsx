"use client"; // Ensure this runs in the client side

import { usePathname } from "next/navigation"; // Import usePathname
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Get the current route
  const isAdminLayout = pathname.startsWith("/admin") || pathname === "/login"; // Check if the layout is admin

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Exclude Header & Footer for admin layout */}
        {!isAdminLayout && <Header />}
        {children}
        {!isAdminLayout && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}
