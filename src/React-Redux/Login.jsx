import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    const redirectPath = location.state?.from?.pathname || "/";
    navigate(redirectPath, { replace: true });
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default Login;
