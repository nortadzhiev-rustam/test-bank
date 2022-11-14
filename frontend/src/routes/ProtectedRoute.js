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
  console.log(isLoggedIn);
  return isAuth ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
