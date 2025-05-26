import React from "react";
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({isAdmin}) => {
  return  isAdmin ? <Outlet/> : <Navigate to={"/profile"} />;
  
};

export default PrivateRoute;


