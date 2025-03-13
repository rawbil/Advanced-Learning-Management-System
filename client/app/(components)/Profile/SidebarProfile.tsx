import Image from "next/image";
import { RiLockPasswordLine } from "react-icons/ri";
import {SiCoursera} from 'react-icons/si'
import {AiOutlineLogout} from 'react-icons/ai'

interface Props {
  user: any;
  active: number;
  //avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
}
export default function SidebarProfile({
  user,
  active,
  //avatar,
  setActive,
  logoutHandler,
}: Props) {
  return (
    <div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => setActive(1)}
      >
        <Image
          src={user.avatar ? user.avatar.url : "/profile.webp"}
          alt="profile"
          width={30}
          height={30}
          unoptimized
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full object-cover "
        />
        <h5 className="pl-2 800px:block hidden font-poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} />
        <h5 className="pl-2 800px:block hidden">Change Password</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} />
        <h5 className="pl-2 800px:block hidden">Enrolled Courses</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer`}
       onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={20} />
        <h5 className="pl-2 800px:block hidden">Logout</h5>
      </div>
    </div>
  );
}
