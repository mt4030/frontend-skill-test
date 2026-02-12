'use client'
import { GameProvider } from "@/providers/context";
import QueryProvider from "@/providers/query-provider";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/nav/navbar";
import Footer from "@/app/components/footer";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark" />
        
          <QueryProvider>
            <GameProvider>
            <NavBar />
            {children}
           <Footer />
            </GameProvider>
          </QueryProvider>
       
     
      </body>
    </html>
  );
}
