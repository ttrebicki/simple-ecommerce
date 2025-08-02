import { PropsWithChildren } from "react";

import { inter } from "@/lib/constants/fonts";
import { Navbar } from "@/ui/layout/Navbar";
import { Footer } from "@/ui/layout/Footer";
export { metadata } from "@/lib/constants/seo";
import { layoutConstraintsCn } from "@/lib/constants/ui";

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col justify-between bg-background`}
      >
        <Navbar />
        <main className={`${layoutConstraintsCn} pt-4 pb-4 bg-transparent`}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
