import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <i className="fas fa-home"></i>
            <span></span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            <i className="fas fa-user"></i>
            <span></span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/history" className="navbar-link">
            <i className="fas fa-history"></i>
            <span></span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/library" className="navbar-link">
            <i className="fas fa-book"></i>
            <span></span>
          </Link>
        </li>
         {/* Add Login Button */}
         <li className="navbar-item login-item">
          <Link to="/login" className="navbar-link">
            <i className="fas fa-sign-in-alt"></i>
            <span></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
