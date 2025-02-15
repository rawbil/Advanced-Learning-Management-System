import { Metadata } from "next";
import "./globals.css";
import ThemeProvider  from "@/Context/ThemeContext";

export const metadata: Metadata = {
  title: "Learning Management System",
  description: "A Learning Management System for students to learn using video tutorials",
  keywords: "Programming, MERN, Redux, Machine Learning"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-black bg-white">
        <ThemeProvider>
        <main>{children}</main></ThemeProvider>
      </body>
    </html>
  );
}
