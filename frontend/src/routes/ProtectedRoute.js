import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  if (isLoggedIn) {
    return <Component />;
  }
  return <Navigate to='/login' />;
};

export default ProtectedRoute;
