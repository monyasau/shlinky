import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import ClientLayout from "@/ClientLayout";
import { ToastContainer } from "react-toastify";

const InstrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share your links - shlinky",
  description: "A web app to share your links with others",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={InstrumentSans.className}>
        <ClientLayout>{children}</ClientLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
