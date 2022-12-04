import { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Login
  const loginUser = async (userForm) => {
    try {
      const resp = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (resp.data.success)
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, resp.data.accessToken);

      return resp.data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Context data
  const authContextData = { loginUser };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
