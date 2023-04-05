import { useContext } from "react";
import AuthContext from "../context/JWTAuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
