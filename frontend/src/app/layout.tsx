import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/store/Provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-sans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Ngoc Spa",
  description: "Ngoc Spa - Your Sanctuary for Relaxation and Rejuvenation",
  icons: {
    icon: "/logo.png", // hoặc .png, .svg tùy định dạng bạn có
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <ReduxProvider>
          <Navbar />
          {children}
          <Toaster position="bottom-right" />
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
