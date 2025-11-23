import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddCaption.css";
import API from "../../utils/api";

export default function AddCaption() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const mediaUrl = state?.mediaUrl;
  const [caption, setCaption] = useState("");

  const submitStatus = async () => {
    await API.post("/api/status/create", {
      mediaUrl,
      caption
    });

    navigate("/Status"); // Go back to status page
  };

  return (
    <div className="caption-page">
      <h2>Add Caption</h2>

      {/* WhatsApp style circle preview */}
      <div className="preview-circle">
        <div className="inner-circle">
          <img src={mediaUrl} alt="preview" />
        </div>
      </div>

      <textarea
        placeholder="Add a caption..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="caption-input"
      />

      <button onClick={submitStatus} className="submit-caption">
        Post Status
      </button>
    </div>
  );
}
