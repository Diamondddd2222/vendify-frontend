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

    // ✅ Save token and user data to localStorage
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // ✅ Success feedback
    setType("success");
    setMessage("Login successful! Redirecting...");

    // ✅ Redirect user to dashboard after a short delay
    setTimeout(() => navigate("/dashboard"), 5500);

  } catch (error) {
    const backendData = error.response?.data;

    // Handle multiple validation errors (if backend sends them)
     if (backendData?.errors) {
      setMessage(backendData.errors);
    } 
    // Handle single error message
    // else if (backendData?.message) {
    //   setMessage(backendData.message);
    // }
    // Default fallback
    else {
      // setMessage("Login failed! Please try again.");
      setMessage(backendData?.message || "Login failed! Please try again.");
    }

    setType("error");

  } finally {
    setLoading(false);
    // Hide message after 4 seconds
    setTimeout(() => setMessage(""), 4000);
  }
};


  return (
    
    <section className="login-container">
        
             {/* Background Video */}
                   {loading && <LoadingSpinner />}
                   <MessageBar type={type} message={message} />
                  <video className="bg-video-auth" autoPlay loop muted playsInline>
                    <source src={bgVideo} type="video/mp4" />
                  </video>
                  <div className="overlay-login"></div> {/* Background Video */}
       
        
        

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
