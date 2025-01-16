import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import First from "./pages/First";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Library from "./pages/Library";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

function AppContent() {
  const location = useLocation();

  // Determine if the current route is the main page
  const isMainPage = location.pathname === "/";

  return (
    <div className="app">
      {/* Fixed Navbar */}
      <Navbar />      

      {/* Sidebar */}
      <Sidebar />

      <div className="app-content">
        {/* Conditionally Render Header (Logo + Heading) */}
        {isMainPage && (
          <div className="app-header">
            <div className="header-content">
              <img
                src="/src/assets/images/robologo.png"
                alt="Logo"
                className="logo-image"
              />
              <h1 className="app-heading1">VR</h1>
              <h4 className="app-heading2">Mall</h4>
            </div>
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
              />
              <i className="fas fa-search search-icon"></i>
              {/* Right-side Icons */}
              <div className="right-icons">
                <i className="fas fa-heart icon" title="Like"></i>
                <i className="fas fa-male icon" title="Human Model"></i>
                <i className="fas fa-shopping-cart icon" title="Cart"></i>
              </div>
            </div>
          </div>
          
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<First />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
