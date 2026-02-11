'use client';
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
      
 <head>
        <title>Game Info</title>
        <meta name="description" content="A place for finding game info" />

        {/* Favicon */}
        <link rel="icon" href="img\icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

      </head>

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
