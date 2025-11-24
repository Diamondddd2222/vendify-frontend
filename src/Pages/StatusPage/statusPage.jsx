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
  const [myId, setMyId] = useState(null);

  // Decode JWT manually (safe)
  const decodeToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch (err) {
      console.error("Token decode failed:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const res = await API.get("/api/status/all");
        const allStatuses = res.data.statuses || [];

        // decode user ID
        const id = decodeToken();
        setMyId(id);

        if (!id) return;

        // Split statuses correctly
        setMyStatuses(allStatuses.filter((s) => s.userId?._id === id));
        setStatuses(allStatuses.filter((s) => s.userId?._id !== id));
      } catch (error) {
        console.error("Failed to fetch statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  // Upload file
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const form = new FormData();
      form.append("media", file);

      const res = await API.post("/api/status/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const mediaUrl = res.data.mediaUrl;
      const mediaType = file.type.startsWith("video") ? "video" : "image";

      navigate("/add-caption", {
        state: { mediaUrl, mediaType },
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Logic to click avatar
  const handleMyStatusClick = () => {
    if (myStatuses.length === 0) {
      // no status uploaded → open upload picker
      document.getElementById("statusUpload").click();
    } else {
      // has status → open viewer
      navigate("/status-viewer", { state: { statuses: myStatuses } });
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
          <div className="my-status-avatar" onClick={handleMyStatusClick}>
            <div className={`status-ring ${myStatuses.length > 0 ? "has-status" : ""}`}>
              <div className="status-ring-inner">
                {myStatuses.length > 0 ? (
                  <img
                    src={myStatuses[myStatuses.length - 1].mediaUrl}
                    alt="My Status"
                  />
                ) : (
                  <img src="https://via.placeholder.com/80" alt="Your Logo" />
                )}
              </div>
            </div>

            {/* ONLY SHOW + WHEN THERE IS NO STATUS */}
            {myStatuses.length === 0 && (
              <label htmlFor="statusUpload" className="add-status-btn vendify-color">
                <Plus size={14} />
              </label>
            )}

            <input
              type="file"
              name="media"
              id="statusUpload"
              accept="image/*,video/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>

          {/* My Store Title + Camera Upload */}
          <div className="flex-status-bar">
            <div className="add-status-updates">
              <h2 className="my-store-title">My Store</h2>
              <p className="my-store-sub">Tap to add product status</p>
            </div>

            <div className="status-btn-row">
              <label htmlFor="statusUpload" className="camera-btn vendify-color">
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
              onClick={() =>
                navigate("/status-viewer", { state: { statuses: [status] } })
              }
            >
              <div className="status-ring">
                <div className="status-ring-inner">
                  <img src={status.userId.logo} alt={status.userId.storeName} />
                </div>
              </div>
              <div>
                <h4 className="recent-name">{status.userId.storeName}</h4>
                <p className="recent-time">
                  {new Date(status.createdAt).toLocaleString()}
                </p>
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

