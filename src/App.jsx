import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import First from "./pages/first";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import AddItemPage from "./pages/AddItemPage";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="app">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Sidebar */}
        <Sidebar />

        <div className="app-content">
          <div className="app-header">
            <div className="header-logo">
              <img
                src="/src/assets/images/robologo.png"
                alt="Logo"
                className="logo-image"
              />
            </div>
            <h1 className="app-heading1">3D</h1>
            <h4 className="app-heading2">Shopping</h4>
          </div>

          {/* Search Bar and Icons */}
          <div className="search-bar-container">
            {/* Search Bar */}
            <input
              type="text"
              className="search-bar"
              placeholder="Search products..."
            />
            <i className="fas fa-search search-icon"></i>

            {/* Right-side Icons */}
            <div className="right-icons">
              <i className="fas fa-shopping-cart icon"></i>
              <i className="fas fa-heart icon"></i>
              <i className="fas fa-cube icon"></i>
            </div>
          </div>

          {/* Routes */}
          <Routes>
            <Route path="/" element={<First />} />
            <Route path="/add" element={<AddItemPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
