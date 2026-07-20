import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import TabBar from "@/components/tab-bar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: {
    default: "Nitti Sanitation | Trash & Recycling for the South Metro",
    template: "%s | Nitti Sanitation",
  },
  description:
    "Reliable weekly trash, recycling, and yard waste pickup for Apple Valley, Eagan, Lakeville, Rosemount, and the south Twin Cities metro. Family-owned since 1993.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <TabBar />
      </body>
    </html>
  );
}
