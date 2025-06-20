"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function HeaderFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminLayout = pathname.startsWith("/admin") || pathname === "/login";

  return (
    <>
      {!isAdminLayout && <Header />}
      {children}
      {!isAdminLayout && <Footer />}
    </>
  );
}
