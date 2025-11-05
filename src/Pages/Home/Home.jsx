import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCancel } from "react-icons/md";
import vendifyVideo from '../../assets/vendifyVideo.mp4';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleHamburgerMenu = () => {
    setShowHamburgerMenu(!showHamburgerMenu);
    setSidebarOpen(!sidebarOpen);
  };

  const navigateToSignUp = () => {
    navigate('/SignUp');
  };

  const navigateToLogin = () => {
    navigate('/Login');
  };
  return (
    <div className="home-main-container">

      {/* 🎥 Background Video */}
      <video
        className="background-video"
        src={vendifyVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="overlay"></div>

      <div className="home-wrapper">
        {/* Navbar Section */}
        <div className="navbar-section">
          <h2 className="logo-text">Vendify</h2> 
          <div className="hamburger-start-container">
            <Link to='/Login' className="start-link">Start for free</Link>
            <div className="icon-wrapper" onClick={handleHamburgerMenu}>
              <div className={`icon ${showHamburgerMenu ? "show" : "hide"}`}>
                <RxHamburgerMenu className="hamburger-icon" />
              </div>
              <div className={`icon ${!showHamburgerMenu ? "show" : "hide"}`}>
                <MdOutlineCancel className="hamburger-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* 🦸‍♂️ Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Vendify</h1>
            <p>Your one-stop platform for smarter selling.</p>
            <button className="hero-btn" onClick={navigateToSignUp}>Get Started</button>
          </div>
        </section>

        {/* 📱 Sidebar Menu */}
        <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
           <MdOutlineCancel className="cancel-icon" onClick={handleHamburgerMenu}/>
          <ul>
            <li><Link to="/About" onClick={handleHamburgerMenu}>About</Link></li>
            <li><Link to="/Contact" onClick={handleHamburgerMenu}>Contact</Link></li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Home;
