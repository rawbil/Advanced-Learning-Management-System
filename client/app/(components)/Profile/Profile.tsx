"use client";
import { useState } from "react";
import SidebarProfile from "./SidebarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";

interface Props {
  user: any;
}

export default function ProfileComponent({ user }: Props) {
  const [scroll, setScroll] = useState(false);
  //const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false,
  });

  const logoutHandler = async () => {
    await signOut();
    setLogout(true);
  };

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
    <div className="w-[85%] h-screen max-800px:w-[95%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] rounded-[5px] dark:shadow-sm shadow-md mt-[80px] mb-[80px] relative ${scroll ? "top-[120px]" : "top-[30px]"} left-[60px] max-800px:left-[0px] `}
      >
        <SidebarProfile
          user={user}
          active={active}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[100px]">
          <ProfileInfo user={user} />
        </div>
      )}
    </div>
  );
}
