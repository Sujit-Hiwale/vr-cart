import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTachometerAlt, FaBox, FaShoppingCart, FaUsers, FaCog } from "react-icons/fa"; // Import icons
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar open/close
  };

  const closeSidebar = () => {
    setIsOpen(false); // Close the sidebar
  };

  return (
    <div>
      {/* Toggle Button */}
      {!isOpen && (
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {/* Sidebar */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}>
          <div
            className="sidebar"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
          >
            <h2 className="sidebar-heading">Sidebar</h2>
            <ul className="sidebar-menu">
              <li>
                <Link to="/" className="sidebar-link">
                  <FaHome className="sidebar-icon" /> Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="sidebar-link">
                  <FaTachometerAlt className="sidebar-icon" /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/orders" className="sidebar-link">
                  <FaShoppingCart className="sidebar-icon" /> Orders
                </Link>
              </li>
              <li>
                <Link to="/products" className="sidebar-link">
                  <FaBox className="sidebar-icon" /> Products
                </Link>
              </li>
              <li>
                <Link to="/customers" className="sidebar-link">
                  <FaUsers className="sidebar-icon" /> Customers
                </Link>
              </li>
              <li>
                <Link to="/settings" className="sidebar-link">
                  <FaCog className="sidebar-icon" /> Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
