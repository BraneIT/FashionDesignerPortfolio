import React, { useEffect } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Login from './Login/Login';

const ProtectedRoute = () => {
  let token = localStorage.getItem('token');
  // useEffect(() => {
  //   if(!token){
  //     Navigate('/login');
  //   }
  // },[token])
  // const { token } = useAuth();
  // console.log("token:", token);
  
  return (
    token ? <Outlet/> : <Navigate to={'/login'}/> 
  );
};

export default ProtectedRoute;