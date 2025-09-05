import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderClient from './providers/SessionProviderClient'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Incultura",
  description: "Gamifikasi Budaya Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/InculturaLogo.svg" type="image/svg+xml" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderClient>
          {children}
        </SessionProviderClient>
      </body>
    </html>
  );
}
