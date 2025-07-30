import { PropsWithChildren } from "react";
import "./globals.css";
import { inter } from "@/lib/constants/fonts";
import { Navbar } from "@/ui/layout/Navbar";
import { Footer } from "@/ui/layout/Footer";
import { Theme } from "@radix-ui/themes";
export { metadata } from "@/lib/constants/seo";
import "@radix-ui/themes/styles.css";
import { layoutConstraintsCn } from "@/lib/constants/ui";

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pl">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col justify-between bg-foreground`}
      >
        <Theme>
          <Navbar />
          <main className={`${layoutConstraintsCn} pt-4 pb-4`}>{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
