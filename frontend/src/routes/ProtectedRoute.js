import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from '../components/Spinner'
const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isLoading = useSelector((state) => state.user.isLoading);
  if (isLoggedIn === false) return <Spinner loading={isLoading}/>
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
