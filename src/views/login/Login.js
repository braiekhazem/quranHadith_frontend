import "./login.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../components/auth/Auth";
import Logo from "../../components/logo/Logo";
import Input from "../../UI/Input";
import { useStore } from "../../context/JWTAuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function Login() {
  const loginFn = useGoogleLogin({
    onSuccess: async (response) => {
      const idToken = response.access_token;
      try {
        const res = await axios.post(
          "http://localhost:8000/v1/user/oauth2callback",
          {
            code: idToken,
          }
        );
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/");
      } catch (error) {
        console.log({ error });
      }
    },
  });
  const navigate = useNavigate();

  const validate = Yup.object().shape({
    Email: Yup.string().email("Email is invalid").required("Email is required"),
    Password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const { login } = useStore();

  const LoginUser = (values) => {
    login(values.Email, values.Password);
  };

  return (
    <Auth>
      <div className="login">
        <Logo />
        <Formik
          initialValues={{
            Email: "",
            Password: "",
            ConfirmPassword: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            LoginUser(values);
          }}
        >
          {(formik) => (
            <div className="formContainer">
              <h1>Login</h1>
              <Form>
                <Input label="Email" name="Email" type="email" />
                <Input label="Password" name="Password" type="password" />
                <Input
                  label="ConfirmPassword"
                  name="ConfirmPassword"
                  type="password"
                />

                <div className="btn">
                  <button type="submit">Login</button>
                  <button type="reset">Reset</button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
        <div className="switch">
          <Link to="/signup">register</Link>
        </div>
        <div className="access-alternative">
          <span>Or</span>
        </div>
        <div className="oauth_login">
          <div className="btn" onClick={loginFn}>
            <span className="btn_icon" data-provider="google">
              <GoogleIcon />
            </span>
            <span className="btn_text">Log in With Google</span>
          </div>
        </div>
        {/* <GoogleLogin
          onSuccess={async (response) => {
            const idToken = response.access_token;
            try {
              const res = await axios.post(
                "http://localhost:8000/v1/user/oauth2callback",
                {
                  code: idToken,
                }
              );
              console.log(res.data);
              localStorage.setItem("token", res.data.token);
              navigate("/");
            } catch (error) {
              console.log({ error });
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        /> */}
      </div>
    </Auth>
  );
}

// const Login = () => {
//   return <p>login</p>;
// };
export default Login;

const GoogleIcon = () => (
  <svg
    className="btn__icon__svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
  >
    <defs>
      <path
        id="a"
        d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
      />
    </defs>
    <clipPath id="b">
      <use xlinkHref="#a" overflow="visible" />
    </clipPath>
    <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
    <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
    <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
    <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
  </svg>
);
