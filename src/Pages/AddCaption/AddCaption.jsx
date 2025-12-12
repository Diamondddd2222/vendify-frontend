

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./AddCaption.css";
// import API from "../../utils/api";
// import MessageBar from "../../components/MessageBar";

// export default function AddCaption() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const [type, setType] = useState("");
//   const [message, setMessage] = useState("");
//   const [caption, setCaption] = useState("");
//   const [uploading, setUploading] = useState(true);
//   const [mediaUrl, setMediaUrl] = useState(null);
 
//   const mediaType = state?.mediaType;

//   useEffect(() => {
//   const upload = async () => {
//     const form = new FormData();
//     form.append("media", file);

//     try {
//       const res = await API.post("/api/status/upload", form, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });

//       setMediaUrl(res.data.mediaUrl);
//       setUploading(false);
//     } catch (err) {
//       console.error("Upload failed:", err);
//     }
//   };

//   upload();
// }, [file]);

//   const submitStatus = async () => {
//     try {
//       await API.post("/api/status/create", { mediaUrl, mediaType, caption });

//       setType("success");
//       setMessage("Uploaded");

//       setTimeout(() => navigate("/Status"), 2000);
//     } catch (error) {
//       console.error("Failed to upload status:", error);
//       setType("error");
//       setMessage("Failed to Upload");
//     }
//   };

//   return (
//     <div className="caption-container">
//       <MessageBar type={type} message={message} />

    
//       <div className="media-preview">
//         {mediaType === "video" ? (
//           <video src={mediaUrl} controls autoPlay muted />
//         ) : (
//           <img src={mediaUrl} alt="preview" />
//         )}
//       </div>

//       <div className="caption-bar">
//         <input
//           type="text"
//           placeholder="Add a caption..."
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           className="caption-input"
//         />

//         <button className="send-btn" onClick={submitStatus}>
//           ➤
//         </button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddCaption.css";
import API from "../../utils/api";
import MessageBar from "../../components/MessageBar";

export default function AddCaption() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // From previous screen
  const preview = state?.preview;     // Local instant preview
  const file = state?.file;           // Actual file to upload
  const mediaType = state?.mediaType; // "image" or "video"

  const [caption, setCaption] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const submitStatus = async () => {
    if (!file) {
      setType("error");
      setMessage("No file found");
      return;
    }

    try {
      // 1️⃣ Upload actual file to backend/cloudinary
      const form = new FormData();
      form.append("file", file);

      const uploadRes = await API.post("/api/status/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const mediaUrl = uploadRes.data.mediaUrl;

      // 2️⃣ Save status with caption
      await API.post("/api/status/create", {
        mediaUrl,
        mediaType,
        caption,
      });

      setType("success");
      setMessage("Uploaded Successfully");

      setTimeout(() => navigate("/Status"), 1500);
    } catch (error) {
      console.error(error);
      setType("error");
      setMessage("Failed to Upload");
    }
  };

  return (
    <div className="caption-container">
      <MessageBar type={type} message={message} />

      {/* INSTANT PREVIEW */}
      <div className="media-preview">
        {mediaType === "video" ? (
          <video src={preview} autoPlay muted controls />
        ) : (
          <img src={preview} alt="preview" />
        )}
      </div>

      {/* CAPTION BAR */}
      <div className="caption-bar">
        <input
          type="text"
          placeholder="Add a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption-input"
        />

        <button className="send-btn" onClick={submitStatus}>
          ➤
        </button>
      </div>
    </div>
  );
}


