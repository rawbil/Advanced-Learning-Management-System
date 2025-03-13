import { Metadata } from "next";
import { useSelector } from "react-redux";
import UpdateTitle from "./UpdateTitle";


export const metadata: Metadata = {
    title: "User Profile",
    description:
      "A Learning Management System for students to learn using video tutorials",
    keywords: "Programming, MERN, Redux, Machine Learning",
  };

export default function ProfileLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <UpdateTitle />
            {children}
        </div>
    )
}