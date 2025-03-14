import { styles } from "@/app/styles";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { useChangePasswordMutation } from "@/redux/features/user/userApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IPass {
  user: any;
}

export default function ChangePassword({ user }: IPass) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isSuccess, error }] = useChangePasswordMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: logout ? true : false,
  });

  useEffect(() => {
    if (isSuccess) {
      if (
        window.confirm(
          "Once you change your password, you will be required to login again with the new password"
        )
      ) {
        toast.success("Password updated successfully");
        setLoadUser(true);
        logoutHandler()
      }
    }
    if (error) {
      toast.error((error as any).data.message);
      console.log(error);
    }
  }, [isSuccess, error]);

  const logoutHandler = async() => {
    await signOut();
    setLogout(true);
    redirect('/');
  }

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      await changePassword({ oldPassword, newPassword });
    } else {
      alert("passwords do not match");
    }
  };
  return (
    <div className="w-full pl-7 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-poppins text-center font-[500] dark:text-white text-black pb-2 ">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className="w-full 800px:w-[60%] mt-5">
            <label
              htmlFor="oldPassword"
              className="block pb-2 dark:text-white text-black"
            >
              Enter your old password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-full 800px:w-[60%] mt-5">
            <label
              htmlFor="newPassword"
              className="block pb-2 dark:text-white text-black"
            >
              Enter your new password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-full 800px:w-[60%] mt-5">
            <label
              htmlFor="confirmPassword"
              className="block pb-2 dark:text-white text-black"
            >
              Confirm new password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} w-[95%] mb-4 800px:mb-0`}
            />
          </div>

          <button
            type="submit"
            className="w-[95%] 800px:w-[50%] border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 p-2 hover:bg-[#37a39a]/20"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
