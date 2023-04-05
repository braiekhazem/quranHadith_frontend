import "./../login/login.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/logo/Logo";
import Auth from "../../components/auth/Auth";
import { useStore } from "../../context/JWTAuthContext";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import axiosInstance from "../../utils/axios";

function SignUp() {
  const navigate = useNavigate();
  const validate = Yup.object().shape({
    Name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    Phone: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    Email: Yup.string().email("Email is invalid").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const { register } = useStore();

  const registerUser = (values) => {
    const {
      Name: name,
      Email: email,
      Password: password,
      Phone: phone,
    } = values;
    register({ name, email, password, phone });
  };

  return (
    <Auth>
      <div className="login">
        <Logo />
        <Formik
          initialValues={{
            Name: "",
            Email: "",
            Password: "",
            ConfirmPassword: "",
            Phone: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            registerUser(values);
          }}
        >
          {(formik) => (
            <div className="formContainer">
              <h1>Sign Up</h1>
              <Form>
                <Input label="Name" name="Name" type="text" />
                <Input label="Phone" name="Phone" type="text" />
                <Input label="Email" name="Email" type="email" />
                <Input label="Password" name="Password" type="password" />
                <Input
                  label="ConfirmPassword"
                  name="ConfirmPassword"
                  type="password"
                />
                <div className="btn">
                  <button type="submit">Register</button>
                  <button type="reset">Reset</button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
        <div className="switch">
          <Link to="/login">login</Link>
        </div>
      </div>
    </Auth>
  );
}

export default SignUp;
