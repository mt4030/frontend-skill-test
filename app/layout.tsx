import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import './globals.css'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import NavBar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Game Info",
  description: "A place for finding game info",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
 <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
        />
        <QueryProvider>
          <NavBar/>
          {children}
          
          </QueryProvider>
         <Footer/>
    
      </body>
    </html>
  );
}
