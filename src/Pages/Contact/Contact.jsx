import React from "react";
import "./Contact.css";
import bgVideo from "../../assets/vendifyVideo.mp4";

const Contact = () => {
  return (
    <section className="contact-page">
      {/* Background video */}
      <video className="bg-video-contact" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="overlay-contact"></div>

      {/* Contact content */}
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>
          Got questions, feedback, or partnership ideas? We’d love to hear from
          you. Fill out the form below or reach us through our contact info.
        </p>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="you@example.com" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Type your message here..."
            ></textarea>
          </div>

          <button type="submit" className="contact-btn">
            Send Message
          </button>
        </form>

        <div className="contact-info">
          <p>📧 support@vendify.com</p>
          <p>📍 Lagos, Nigeria</p>
          <p>
            Follow us: <span className="highlight-contact">@vendifyofficial</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;


