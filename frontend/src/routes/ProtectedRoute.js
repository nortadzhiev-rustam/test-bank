import React,{useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from '../store/userSlice';
import Spinner from '../components/Spinner'
const ProtectedRoute = () => {
const dispatch = useDispatch();
useEffect(()=> {
  setTimeout(() => {
    dispatch(setLoading(false))
  }, 500);
},[])

  const isAuth = useSelector((state) => state.user.user.isAuth);
  const isLoading = useSelector((state) => state.user.isLoading);
  if (isLoading) return <Spinner loading={isLoading}/>
<<<<<<< HEAD
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
=======

  return isAuth ? <Outlet /> : <Navigate to='/login' />;
>>>>>>> 513df6e5b4260c9b2d209e61f9af55a313bf1023
};

export default ProtectedRoute;
