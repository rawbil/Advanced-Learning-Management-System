import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IHeader {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: number;
}

export default function Header({ open, setOpen, activeItem }: IHeader) {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
      if(window !== undefined) {
     window.addEventListener("scroll", () => {
        if(window.scrollY > 80) {
            setActive(true)
        } else {
            setActive(false);
        }
    })
  }
  }, [active])

  return (
    <div className="w-full relative">
      <div
        className={`border-b dark:border-[#fffff1c]  h-[80px] z-[80] fixed top-0 left-0 right-0 transition duration-500 dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black  ${active ? "shadow-xl" : "shadow"}`}
      >
        Header
      </div>
    </div>
  );
}
