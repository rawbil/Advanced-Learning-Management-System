import { Metadata } from "next";
import "./globals.css";

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
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
}
