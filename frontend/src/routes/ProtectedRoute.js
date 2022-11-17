import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../store/userSlice";
import Spinner from "../components/Spinner";
const ProtectedRoute = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(setLoading(false));
    }, 500);
    return () => clearTimeout(time);
  }, [dispatch]);

  const isAuth = useSelector((state) => state.user.user.isAuth);
  const isLoading = useSelector((state) => state.user.isLoading);
  if (isLoading) return <Spinner loading={isLoading} />;
  return isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedRoute;
