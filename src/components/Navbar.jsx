import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </li>
        <li className="navbar-item">
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </li>
        <li className="navbar-item">
          <i className="fas fa-history"></i>
          <span>History</span>
        </li>
        <li className="navbar-item">
          <i className="fas fa-book"></i>
          <span>Library</span>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
