import type { ReactNode } from 'react';

import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { MovieProvider } from '@/providers/context';
import QueryProvider from '@/providers/query-provider';

import NavBar from './components/nav/navbar';
import Footer from './components/footer';

import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <MovieProvider>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="dark"
            />

            <NavBar />
  <main className="mx-auto w-full max-w-400 rounded-[18px] px-4 sm:px-6 lg:px-8">
            {children}
</main>
            <Footer />
          </MovieProvider>
        </QueryProvider>
      </body>
    </html>
  );
}