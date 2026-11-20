import type { Metadata } from "next";
import { Geist, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import { Toaster } from "@/components/ui/toast";
import Sesssionprovider from "@/components/SesssionProvider/SesssionpProvider";
import { CartContextProvider } from "@/context/cartNumber.context";
import { Suspense } from "react";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ropo = Roboto({
  variable: "--font-robo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart online store",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {

  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${ropo.className} min-h-full flex flex-col`}>
        <CartContextProvider>
          <Sesssionprovider >
            <Suspense fallback={<div className="h-20" />}>
              <Navbar />
            </Suspense>
            {children}
            <Toaster />
            <Footer />
          </Sesssionprovider>
        </CartContextProvider>
      </body>
    </html>
  );
}
