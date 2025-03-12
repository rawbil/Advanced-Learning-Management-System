import { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import ClientLayout from "@/redux/ClientLayout";
import AuthProvider from "./(utils)/SessionProvider";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./(components)/Loader/Loader";
import { Custom } from "./(utils)/CustomFile";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const Josefin = Josefin_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-josefin",
});

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
    <html
      lang="en"
      className={`${poppins.variable} ${Josefin.variable}`}
      suppressHydrationWarning
    >
      <head></head>
      <body
        className={`dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white duration-300`}
      >
        <ClientLayout>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <main><Custom>{children}</Custom></main>
              <Toaster position="top-center" reverseOrder={false} />
            </AuthProvider>
          </ThemeProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
