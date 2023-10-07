import React from "react";
import { Link, useLocation } from "react-router-dom";

import "../style/index.css";
import "../style/navbar.css";
import "../style/HomePage.css";

const Navbar = ({ isLoggedIn }) => {
  const location = useLocation();
  const navLinkStyle =
    location.pathname === "/dashboard" ||
    location.pathname === "/cart" ||
    location.pathname === "/contactus"
      ? { color: "black" }
      : {};
  return (
    <nav>
      <div>
        <h1 className="page-name">Jogger</h1>

        <div className="nav-links">
          <Link style={navLinkStyle} to="/">
            Home
          </Link>
          <Link style={navLinkStyle} to="/dashboard">
            Products
          </Link>
          <Link style={navLinkStyle} to="/cart">
            Cart
          </Link>
          <Link style={navLinkStyle} to="/contactus">
            Contact Us
          </Link>
          {isLoggedIn ? (
            <Link style={navLinkStyle} to="/logout">
              Logout
            </Link>
          ) : (
            <Link style={navLinkStyle} to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
