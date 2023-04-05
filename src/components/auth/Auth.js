import { GoogleOAuthProvider } from "@react-oauth/google";
import "./auth.css";

function Auth({ children }) {
  return <div className="auth">{children}</div>;
}

export default Auth;
