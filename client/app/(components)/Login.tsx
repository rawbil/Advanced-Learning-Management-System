import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";

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

  


  return <div>Login</div>;
}
