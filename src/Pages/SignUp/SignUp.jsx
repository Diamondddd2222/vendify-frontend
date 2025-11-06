import React, { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import bgVideo from "../../assets/vendifyVideo.mp4";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup data:", formData);
    // Here you'll later connect to backend API
  };

  return (
    <section className="auth-page">
      {/* Background Video */}
      <video className="bg-video-auth" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay-auth"></div>

      <div className="auth-container">
        <h1>Create Your Vendify Account</h1>
        <p>Join hundreds of vendors growing their businesses with Vendify.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleChange}
              placeholder="Enter your brand name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
