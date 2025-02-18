import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Dispatch, SetStateAction, useState } from "react";
import { styles } from "../styles";

interface Props {
  setRoute: Dispatch<SetStateAction<string>>;
}

//yup schema validation
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("please enter your email"),
  password: Yup.string().required("please enter your password").min(8),
  name: Yup.string().required("Please enter your name").min(3),
});

export default function Register({ setRoute }: Props) {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password, name }) => {
      setRoute("Verification")
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div>
      <div className="w-full">
        <h1 className={`${styles.title}`}>Register with LMS</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className={`${styles.label}`}>
              Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              id="name"
              placeholder="Enter your name"
              className={`${styles.input} ${errors.name && touched.name ? " border-red-500" : ""}`}
            />

            <p className="text-red-500 text-sm">{errors.name}</p>
          </div>

          <div className="mt-5">
            <label htmlFor="email" className={`${styles.label}`}>
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              id="email"
              placeholder="johndoe@gmail.com"
              className={`${styles.input} ${errors.email && touched.email ? " border-red-500" : ""}`}
            />

            <p className="text-red-500 text-sm">{errors.email}</p>
          </div>
          {/* password */}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className={`${styles.label}`}>
              Password:{" "}
            </label>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`${errors.password && touched.password && "border border-red-500"}  ${styles.input}`}
            />

            {show ? (
              <span
                className={`absolute z-1 top-1/2 right-2 cursor-pointer ${errors.password ? "top-[42%]" : ""}`}
                onClick={() => setShow(!show)}
              >
                <FaEyeSlash />
              </span>
            ) : (
              <span
                className={`absolute z-1 top-1/2 right-2 cursor-pointer ${errors.password ? "top-[42%]" : ""}`}
                onClick={() => setShow(!show)}
              >
                <FaEye />
              </span>
            )}

            <p className="text-red-500 text-sm pb-4 block">{errors.password}</p>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className={`flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2190ff] min-h-[45px] w-full text-base font-poppins font-semibold mt-5`}
          >
            Register
          </button>
          <br />

          {/* social auth */}
          <div className="flex flex-row justify-between items-center gap-[5%]">
            <hr className="dark:bg-white dark:shadow-none shadow-sm shadow-black/50 bg-black w-1/2 " />
            <h1 className="font-josefin uppercase text-lg">or</h1>
            <hr className="dark:bg-white dark:shadow-none bg-black shadow-sm shadow-black/50 w-1/2 " />
          </div>
          <div className="flex items-center justify-center my-3 gap-[10%]">
            <span className="cursor-pointer " title="login with google">
              <FcGoogle size={28} />
            </span>
            <span className="cursor-pointer" title="login with github">
              <FaGithub size={28} />
            </span>
          </div>

          <h5 className="text-center pt-4 font-poppins text-[14px]">
            Already have an account?{" "}
            <span
              className="text-[#2190ff] pl-1 cursor-pointer"
              onClick={() => setRoute("Login")}
            >
              Login
            </span>
          </h5>
        </form>
      </div>
    </div>
  );
}
