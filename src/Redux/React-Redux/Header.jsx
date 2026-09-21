import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const isUser = localStorage.getItem("isLoggedIn");

  return (
    <div className="bg-blue-500 text-white flex justify-between px-3 py-2 items-center mb-2">
      <Link to="/">
        <h1>Shopping</h1>
      </Link>

      <div className="right flex gap-2">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {isUser ? (
          <button onClick={handleLogOut}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;
