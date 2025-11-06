import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="bag-loader">
        <div className="bag-handle"></div>
        <div className="bag-body"></div>
        <p className="loader-text">Loading Vendify...</p>
      </div>
    </div>
  );
};

export default Loader;
