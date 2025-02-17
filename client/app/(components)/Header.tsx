import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavItems from "../(utils)/NavItems";
import ThemeSwitcher from "../(utils)/ThemeSwitcher";
import { Menu } from "lucide-react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";

interface IHeader {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: number;
}

export default function Header({ open, setOpen, activeItem }: IHeader) {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
          setActive(true);
        } else {
          setActive(false);
        }
      });
    }
  }, [active]);

  return (
    <div className="w-full relative">
      <div
        className={`border-b dark:border-[#fffff1c]  h-[80px] z-[80] fixed top-0 left-0 right-0 transition duration-500 dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black   ${active ? "shadow-xl" : "shadow"}`}
      >
        <div className="w-[95%] 800px:w-[92%] mx-auto py-2 h-full flex items-center">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <Link
              href={"/"}
              className={`text-[25px] font-josefin font-[800] text-black dark:text-white`}
            >
              LMS
            </Link>
          </div>
          <div className="flex items-center">
            <NavItems activeItem={activeItem} isMobile={isMobile} />
          </div>
          <ThemeSwitcher />

          {/* mobile */}
          <div className="800px:hidden">
            <div
              className="cursor-pointer dark:text-white text-black"
              onClick={() => setOpenSidebar(true)}
            >
              <HiOutlineMenuAlt3 size={25} />
            </div>
          </div>
          {/* user icon */}
          <div className="cursor-pointer dark:text-white text-black" onClick={() => setOpen(!open)}>
            <HiOutlineUserCircle size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}
