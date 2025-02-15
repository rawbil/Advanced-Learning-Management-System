import { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "Learning Management System"
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}