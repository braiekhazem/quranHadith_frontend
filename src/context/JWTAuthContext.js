import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getMe } from "../services/protectApi";
import { actionAudio } from "../store/slices/audio";
import axiosInstance from "../utils/axios";
import { useDialogContext } from "./dialogStore";

const initialAuthState = {
  isAuthenticated: !!localStorage.getItem("token") || false,
  isInitialised: false,
  user: null,
};

const isValidToken = (token) => {
  const decoded = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (token, reftoken) => {
  if (token) {
    localStorage.setItem("token", token);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case "LOGIN": {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case "REGISTER": {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  method: "JWT",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const { showPopup } = useDialogContext();
  const [state, dispatch] = useReducer(reducer, initialAuthState);
  const dispatchRedux = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const login = async (email, password) => {
    const response = await axiosInstance.post("user/login", {
      email,
      password,
    });
    if (response.response && response.response?.status !== 200)
      return showPopup("invalid creadentialls");
    showPopup("you logged in successfully", "SUCCESS");
    let { token } = response.data;
    setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        token,
      },
    });
    dispatchRedux(actionAudio.resetAudio());
    return response;
  };

  const register = async (user) => {
    const response = await axiosInstance.post("user/signup", user);

    if (response.response && response.response?.status !== 200)
      return showPopup("invalid creadentialls");

    showPopup("you register in successfully", "SUCCESS");

    let { token, data } = response.data;
    setSession(token);
    dispatch({
      type: "REGISTER",
      payload: {
        user: data.user,
      },
    });
    dispatchRedux(actionAudio.resetAudio());
    return response;
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    const initialise = async () => {
      try {
        const token = window.localStorage.getItem("token");

        if (token && isValidToken(token)) {
          if (!state.user) {
            const { data } = await getMe("user/me");
            dispatch({
              type: "INITIALISE",
              payload: {
                isAuthenticated: true,
                user: data.data.user,
              },
            });
          }
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialise();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: "JWT",
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const useStore = () => useContext(AuthContext);
