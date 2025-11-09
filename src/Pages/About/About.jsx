import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import bgVideo from "../../assets/vendifyVideo.mp4";

const About = () => {
  return (
    <section className="about-page">
      {/* Background video */}
      <video className="bg-video" autoPlay loop muted playsInline preload="auto">
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="overlay-about"></div>

      {/* Content container */}
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <h1>About Vendify</h1>
          <p>
            Empowering online vendors with personal stores that build trust,
            visibility, and growth — all in one place.
          </p>
        </div>

        {/* Who We Are */}
        <div className="about-section">
          <h2>Who We Are</h2>
          <p>
            Vendify is a next-generation e-commerce platform designed to help
            fashion vendors and small businesses sell smarter. We provide a
            permanent, personalized space where your products never disappear —
            and your brand shines 24/7.
          </p>
          <ul>
            <li>Personal online stores for every vendor</li>
            <li>Verified seller badges for building trust</li>
            <li>Visibility tools to reach your audience easily</li>
            <li>A vendor-first community focused on growth</li>
          </ul>
        </div>

        {/* Mission */}
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            To empower small and medium vendors to build lasting online stores
            and earn trust through transparency. We’re replacing the 24-hour
            cycle of social selling with something permanent, professional, and
            profitable.
          </p>
        </div>

        {/* Vision */}
        <div className="about-section">
          <h2>Our Vision</h2>
          <p>
            We aim to become Africa’s most trusted vendor network — where every
            seller owns their digital identity, and every buyer shops with
            confidence. Vendify isn’t just a store builder; it’s a digital
            movement of entrepreneurs redefining e-commerce.
          </p>
        </div>

        {/* What Vendors Get */}
        <div className="about-section">
          <h2>What Vendors Get</h2>
          <ul className="benefits-list">
            <li>
              <strong>Personal Storefront:</strong> Your unique Vendify link
              (e.g., vendify.com/yourstore)
            </li>
            <li>
              <strong>Verified Seller Badge:</strong> Build instant trust and
              credibility
            </li>
            <li>
              <strong>Unlimited Product Uploads:</strong> Your items stay visible
              24/7
            </li>
            <li>
              <strong>Customer Communication:</strong> Inquiries, reviews, and
              feedback in one place
            </li>
          </ul>
        </div>

        {/* Promise */}
        <div className="about-section">
          <h2>Our Promise</h2>
          <p>
            Vendify isn’t just a platform — it’s your digital business partner.
            We promise to help you grow your brand, connect with customers, and
            turn your online hustle into a thriving business.
          </p>
        </div>

        {/* Contact */}
        <div className="about-contact">
          <h2>Get in Touch</h2>
          <p>support@vendify.com</p>
          <p>Lagos, Nigeria</p>
          <p>
            Follow us: <span className="highlight">@vendifyofficial</span>
          </p>
        </div>
        {/* Footer */}
        <div className="about-footer">
          <h3 className="vendify-footer-logo">Vendify</h3>
          <p className="slogan-footer"> Empowering Africa’s Vendors, One Store at a Time.</p>

          <div className="footer-links">
            <Link to='/'>Home</Link>
            <Link to='/Terms'>Terms & Privacy</Link>
          </div>
        </div>

        <div className="copyRight">
           <p className="rights">&copy; 2025 Vendify. All rights reserved.</p>
        </div>

       
      </div>
    </section>
  );
};

export default About;
