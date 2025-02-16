import { Metadata } from "next";
import "./globals.css";
import {Poppins} from 'next/font/google'
import {Josefin_Sans} from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: "--font-poppins"
})

const Josefin = Josefin_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: "--font-josefin"
})

export const metadata: Metadata = {
  title: "Learning Management System",
  description:
    "A Learning Management System for students to learn using video tutorials",
  keywords: "Programming, MERN, Redux, Machine Learning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${Josefin.variable}`}>
      <head>
   
      </head>
      <body className={`dark:bg-black bg-white `} >
        
          <main>{children}</main>
        
      </body>
    </html>
  );
}
