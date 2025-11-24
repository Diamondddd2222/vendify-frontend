import React, { useEffect, useState } from "react";
import "./statusPage.css";
import { Plus, Camera, MoreVertical } from "lucide-react";
import BottomNav from "../../components/BottomNav";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";




const StatusPage = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState([]);
  const [myStatuses, setMyStatuses] = useState([]);
  

  // Fetch all statuses on mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await API.get("/api/status/all"); // Make sure backend endpoint returns all statuses
        const allStatuses = res.data.statuses || [];
        console.log("All Status", allStatuses)
        const token = localStorage.getItem("token");
        let myId = null;

        if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log(payload)
        myId = payload.id;
        console.log("Current user ID:", myId);
        }

        // Split my statuses vs others
        setMyStatuses(allStatuses.filter((s) => s._id === myId));
        setStatuses(allStatuses.filter((s) => s._id !== myId));
      } catch (error) {
        console.error("Failed to fetch statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  const handleFileChange = async (e) => {
  try {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("media", file); 
    console.log("sending file:", file);

    // 🚀 Send to backend
    const res = await API.post("/api/status/upload", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Upload response:", res.data);

    // Extract returned Cloudinary URL
    const mediaUrl = res.data.mediaUrl;
    const mediaType = file.type.startsWith("video") ? "video" : "image";
    
    // Navigate to caption page
    navigate("/add-caption", {
      state: { mediaUrl, mediaType },
    });
  } catch (error) {
    console.error("Upload failed:", error);
  }
};




  return (
    <>
      <div className="status-page">
        <div className="status-header">
          <h1>Status</h1>
          <MoreVertical className="icon-vertical" />
        </div>

        {/* My Status */}
        <div className="my-status-section">
          <div className="my-status-avatar" onClick={() => navigate("/status-viewer", { state: { statuses: myStatuses } })}>
            <div className="status-ring">
              <div className="status-ring-inner">
                {/* Show last uploaded media thumbnail */}
                {myStatuses.length > 0 ? (
                  <img src={myStatuses[myStatuses.length - 1].mediaUrl} alt="My Status" />
                ) : (
                  <img src="https://via.placeholder.com/80" alt="Your Logo" />
                )}
              </div>
            </div>

            <label htmlFor="statusUpload" className="add-status-btn">
              <Plus size={14} />
            </label>
            <input
              type="file"
              name="media"
              id="statusUpload"
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          <div className="flex-status-bar">
            <div className="add-status-updates">
              <h2 className="my-store-title">My Store</h2>
              <p className="my-store-sub">Tap to add product status</p>
            </div>
            <div className="status-btn-row">
              <label htmlFor="statusUpload" className="camera-btn">
                <Camera size={14} />
              </label>
              <input
                type="file"
                name="media"
                id="statusUpload"
                accept="image/*,video/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Other Statuses */}
        <h3 className="recent-title">Recent Updates</h3>
        <div className="recent-list">
          {statuses.map((status) => (
            <div
              key={status._id}
              className="recent-item"
              onClick={() => navigate("/status-viewer", { state: { statuses: [status] } })}
            >
              <div className="status-ring">
                <div className="status-ring-inner">
                  <img src={status.logo} alt={status.storeName} />
                </div>
              </div>
              <div>
                <h4 className="recent-name">{status.storeName}</h4>
                <p className="recent-time">{new Date(status.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default StatusPage;
