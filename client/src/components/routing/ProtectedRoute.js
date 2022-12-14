import React, { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ children }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading) {
    return (
      <div className='spinner-container'>
        <Spinner animation='border' variant='info' />
      </div>
    );
  }

  return isAuthenticated ? (
    <>
      <NavbarMenu />
      {children}
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default ProtectedRoute;
