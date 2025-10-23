import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "react-hot-toast";
import Providers from "./redux/Providers";


export const metadata = {
  title: "Trust Consult",
  description: "Get expert advice from trusted consultants",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <Providers>
            <Navbar />
            {children}
            <Toaster/>
          </Providers>
        </body>
    </html>
  );
}
