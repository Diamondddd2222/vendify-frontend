import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddCaption.css";
import API from "../../utils/api";
import MessageBar from "../../components/MessageBar";

export default function AddCaption() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const mediaUrl = state?.mediaUrl;
  const mediaType = state?.mediaType
  const [caption, setCaption] = useState("");

  const submitStatus = async () => {
  try {
    await API.post("/api/status/create", {
      mediaUrl,
      mediaType,
      caption,
    });

    setType("success");
    setMessage("Uploaded");
    console.log('success')
    setTimeout(() => navigate("/Status"), 4500); // wait 4.5secs
  } catch (error) {
    console.error("Failed to upload status:", error);
    setType("error");
    setMessage("Failed to Upload");
  }
};


  return (
    <div className="caption-page">
       <MessageBar type={type} message={message} />
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
