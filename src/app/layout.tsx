import { PropsWithChildren } from "react";
import "./globals.css";
import { inter } from "@/lib/constants/fonts";
import { Navbar } from "@/ui/layout/Navbar";
import { Footer } from "@/ui/layout/Footer";
export { metadata } from "@/lib/constants/seo";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col justify-between bg-background`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
