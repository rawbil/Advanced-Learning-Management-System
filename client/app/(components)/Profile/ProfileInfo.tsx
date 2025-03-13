"use client";
import { styles } from "@/app/styles";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

interface Props {
  user: any;
}

export default function ProfileInfo({ user }: Props) {
  const [name, setName] = useState(user && user.name);

  const imageHandler = async (e: any) => {
    console.log("image");
  };

  const handleSubmit = async (e: any) => {
    console.log("submit");
  };

  return (
    <div>
      <div className="w-full flex justify-center  ">
        <div className="relative">
          <Image
            src={user.avatar ? user.avatar.url : "/profile.webp"}
            alt=""
            width={50}
            height={50}
            unoptimized
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full object-cover "
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] dark:bg-slate-900 bg-white rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer z-[1]">
              <AiOutlineCamera size={20} />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[60%] m-auto block pb-4">
            <div className="w-full">
              <label htmlFor="name" className="block p-2">
                Full Name
              </label>
              <input
                type="text"
                className={`${styles.input} w-[100%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full pt-2">
              <label htmlFor="email" className="block p-2">
                Emal Address
              </label>
              <input
                type="email"
                readOnly
                id="email"
                value={user?.email}
                className={`${styles.input} w-[100%] mb-1 800px:mb-0`}
                required
              />
            </div>
            <input type="submit" value="Update" required className={`w-full 800px:w-[250px] 800px:mx-auto h-[40px] border border-[#37a39a] hover:bg-[#37a39a]/20 text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`} />
          </div>
        </form>
      </div>
    </div>
  );
}
