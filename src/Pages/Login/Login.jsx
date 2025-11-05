import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import bgVideo from "../../assets/vendifyVideo.mp4";

const Login = () => {
  return (
    <section className="login-container">
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay-login"></div>

      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Log in to continue building your Vendify store</p>

        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Phone or Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your phone or email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="login-footer">
            <p>
              Don’t have an account? <Link to="/SignUp">Sign up</Link>
            </p>
            <p>
              <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
