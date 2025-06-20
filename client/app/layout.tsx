import "./globals.css";
import { Inter } from "next/font/google";
import { Anton, Lato } from "next/font/google";
import HeaderFooterLayout from "@/components/HeaderFooterLayout";
import { Toaster } from "@/components/ui/toaster";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-lato",
});

export const metadata = {
  title: "repairmyconcrete",
  description: "Expert concrete and foundation repair services for residential and commercial properties. Trusted solutions for cracks, leveling, waterproofing, and more.",
  icons: {
    icon: "/favicon.ico",
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${lato.variable}`}>
      <body className={inter.className}>
        <HeaderFooterLayout>{children}</HeaderFooterLayout>
        <Toaster />
      </body>
    </html>
  );
}
