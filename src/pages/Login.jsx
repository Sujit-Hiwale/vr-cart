import React from "react";
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section - Login Form */}
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          <p className="login-subtext">
            Don’t have an account yet? <a href="#" className="signup-link">Sign Up</a>
          </p>

          <form className="login-form">
            <div className="form-group">
              <label style={{textAlign:"left"}}>Email Address</label>
              <input type="email" placeholder="username.." />
            </div>
            <div className="form-group">
              <label style={{textAlign:"left"}}>Password <a href="#" className="forgot-link">Forgot Password?</a></label>
              <input type="password" placeholder="Enter secret code.." />
            </div>
            <div style={{textAlign:"right"}}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember"  style={{color:"grey"}}>Remember me</label>
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="divider">or login with</div>
          <div className="social-login">
            <button className="social-btn google-btn">Google</button>
            <button className="social-btn facebook-btn">Facebook</button>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="login-illustration">
          <img src="/src/assets/images/illustration.png" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}

export default Login;
