import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const WithAuth = (Component) => {
  return function ProtectedComponent() {
    const location = useLocation();

    const isUser = localStorage.getItem("isLoggedIn");

    if (!isUser) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Component />;
  };
};

export default WithAuth;
