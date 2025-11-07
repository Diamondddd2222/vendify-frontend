import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgVideo from "../../assets/vendifyVideo.mp4";
import LoadingSpinner from "../../components/Loader.jsx";
import MessageBar from "../../components/MessageBar.jsx";
import API from "../../utils/api.js";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    brandName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
    const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await API.post("/api/users/register", formData);
    setMessage(res.data.message);
    setType("success");

    // Redirect after success
    setTimeout(() => navigate("/dashboard"), 5500);

  } catch (error) {
    const backendData = error.response?.data;
 // Handle multiple validation errors (from express-validator)
    if (backendData?.errors) {
      setMessage(backendData.errors);
    } 
   
    // Handle single message error (custom server errors)
    // if (backendData?.message) {
    //   setMessage(backendData.message);
    // } 
    // Fallback if no clear message
    else {
      setMessage("Registration failed. Please try again.");
    }

    setType("error");
    setTimeout(() => setMessage(""), 8000);

  } finally {
    setLoading(false);
  }
};


  return (
    <section className="auth-page">
      {/* Background Video */}
       {loading && <LoadingSpinner />}
       <MessageBar type={type} message={message} />
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
