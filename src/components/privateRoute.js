import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/Login" />;
  }
  return <Outlet />;
};
  
