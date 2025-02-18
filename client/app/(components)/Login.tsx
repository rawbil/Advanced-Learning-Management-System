import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";
import { styles } from "../styles";

interface Props {
  setRoute: Dispatch<SetStateAction<string>>;
}

//yup schema validation
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(8),
});

export default function Login({ setRoute }: Props) {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      console.log(email, password);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div>
      <div className="w-full">
        <h1 className={`${styles.title}`}>Login with LMS</h1>

        <form onSubmit={handleSubmit}>
            <div>
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
            className={`${errors.email && touched.email && "border border-red-500"}  ${styles.input}`}
          />

          <p className="text-red-500 text-sm">{errors.email}</p>
          </div>
          {/* password */}
          <div></div>
        </form>
      </div>
    </div>
  );
}
