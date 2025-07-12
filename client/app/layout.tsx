import "./globals.css";
import { Inter } from "next/font/google";
import { Anton, Lato } from "next/font/google";
import HeaderFooterLayout from "@/components/HeaderFooterLayout";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script"; // ✅ Import Script

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
  description:
    "Expert concrete and foundation repair services for residential and commercial properties. Trusted solutions for cracks, leveling, waterproofing, and more.",
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
      <head>
        {/* ✅ Correct way to include Microsoft Clarity using next/script */}
        <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "s65ry9rckx");
          `} 
        </Script>
      </head>
      <body className={inter.className}>
        <HeaderFooterLayout>{children}</HeaderFooterLayout>
        <Toaster />
      </body>
    </html>
  );
}
