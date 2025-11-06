import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loader.jsx";
import MessageBar from "../../components/MessageBar.jsx";
import API from "../../utils/api.js";
import bgVideo from "../../assets/vendifyVideo.mp4";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

      // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/api/users/login", formData);

      // ✅ Save token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setType("success");
      setMessage("Login successful! Redirecting...");
       setTimeout(() => navigate("/dashboard"), 1500);
      // ✅ Redirect user to dashboard or homepage
      navigate("/dashboard");
    } catch (err) {
     
        setType("error");
      setMessage(err.response?.data?.message || "Login failed! Please try again.")
      
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000); // Auto-hide after 3s
    }
  };

  return (
    
    <section className="login-container">
        {loading && <LoadingSpinner />}
      <MessageBar type={type} message={message} />
      <video className="bg-video" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay-login"></div>

      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Log in to continue building your Vendify store</p>

        <form onSubmit={handleSubmit} className="login-form">
            {error && <p className="error">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Phone or Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn"> {loading ? "Logging in..." : "Login"}</button>

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
