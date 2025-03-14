import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import NavItems from "../(utils)/NavItems";
import ThemeSwitcher from "../(utils)/ThemeSwitcher";
import { Menu } from "lucide-react";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../(utils)/CustomModal";
import Login from "./Login";
import Register from "./Register";
import Verification from "./Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
const avatar = "/profile.webp";

interface IHeader {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: number;
  setActiveItem: Dispatch<SetStateAction<number>>;
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
}

export default function Header({
  open,
  setOpen,
  activeItem,
  setActiveItem,
  route,
  setRoute,
}: IHeader) {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  //console.log(data);
/*   const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false,
  }); */
  const pathname = usePathname();

  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data.user?.email,
          name: data.user?.name,
          avatar: data.user?.image,
        });
      /*if (data === null) {
          setLogout(true);
        } */
      }
    }
    if (isSuccess) {
      toast.success("Login successful");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [data]);

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

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={`border-b dark:border-[#fffff1c]  h-[80px] z-[80] fixed top-0 left-0 right-0 transition duration-500 dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white ${active ? "shadow-xl" : "shadow"}`}
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
          {user ? (
            <Image
              src={user.avatar ? user.avatar?.url : avatar}
              alt="avatar"
              width={40}
              height={40}
              className={`cursor-pointer dark:text-white text-black hidden 800px:block rounded-full object-cover w-[30px] h-[30px] ${activeItem === 4 && 'border-2 border-[#37a39a]'} ${pathname === '/profile' && 'border-2 dark:border-[#37a39a] border-[crimson]'}`}
              onClick={() => {router.push("/profile"); setActiveItem(4)}}
            />
          ) : (
            <div
              className="cursor-pointer dark:text-white text-black hidden 800px:block"
              onClick={() => setOpen(!open)}
            >
              <HiOutlineUserCircle size={25} />
            </div>
          )}
        </div>

        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 right-0 z-[999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] z-[999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 absolute">
              <NavItems activeItem={activeItem} isMobile={true} />
              {user ? (
                <Image
                  src={user.avatar ? user.avatar?.url : avatar}
                  alt="avatar"
                  width={40}
                  height={40}
                  className={`cursor-pointer mx-5 rounded-full object-cover w-[30px] h-[30px] ${pathname === '/profile' && 'border-2 dark:border-[#37a39a] border-[crimson]'}`}
                  onClick={() => {router.push("/profile"); () => setActiveItem(4)}}
                />
              ) : (
                <div
                  className="cursor-pointer dark:text-white text-black mx-5"
                  onClick={() => setOpen(!open)}
                >
                  <HiOutlineUserCircle size={25} />
                </div>
              )}

              <br />
              <br />
              <p className="text-center">
                Copyright &copy; {new Date().getFullYear()} LMS
              </p>
            </div>
          </div>
        )}
      </div>

      {/* auth */}
      {route === "Login" ? (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      ) : route === "Sign-up" ? (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Register}
            />
          )}
        </>
      ) : route === "Verification" ? (
        <>
          {open && (
            <CustomModal
              open={open}
              setOpen={setOpen}
              activeItem={activeItem}
              setRoute={setRoute}
              component={Verification}
            />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
