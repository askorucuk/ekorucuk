import type { Metadata } from "next";
import "../styles/base.scss";
import "../globals.css";
import clsx from "clsx";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Dialog from "@/components/Dialogs/Dialog";

import ToastProvider from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "Ebubekir Korucuk",
  description: "Ebubekir Korucuk's Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={clsx("k-body py-4 xl:px-[12vw] lg:px-[6vw] md:px-[3vw] px-[4vw] ")}>

        <Navbar />
        {children}
        <Footer />
        <Dialog />
        <ToastProvider />
      </body>
    </html>
  );
}
