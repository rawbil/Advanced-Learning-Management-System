"use client";
import { useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";


interface Props {
  user: any;
}

export default function ProfileComponent({ user }: Props) {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false
  });

  const logoutHandler = async () => {
    signOut();
    setLogout(true);
    redirect('/');
  }

  if (typeof window !== undefined) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] rounded-[5px] dark:shadow-sm shadow-md mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px] `}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
    </div>
  );
}
