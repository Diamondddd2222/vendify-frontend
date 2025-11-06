// LoadingSpinner.jsx
import React from "react";
import "./Loader.css";

const LoadingSpinner = () => {
  return (
    <div className="loader-container">
      <div className="shopping-bag">
        <div className="bag-handle"></div>
        <div className="bag-body"></div>
      </div>
      <p className="loading-text">Loading your store...</p>
    </div>
  );
};

export default LoadingSpinner;
