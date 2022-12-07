import { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Load
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const resp = await axios.get(`${apiUrl}/auth`);
      if (resp.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: resp.data.user },
        });
      } else {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        setAuthToken(null);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const loginUser = async (userForm) => {
    try {
      const resp = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (resp.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, resp.data.accessToken);

      await loadUser();

      return resp.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register
  const registerUser = async (userForm) => {
    try {
      const resp = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (resp.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, resp.data.accessToken);

      await loadUser();
      return resp.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  // Context data
  const authContextData = { loginUser, registerUser, logoutUser, authState };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
