
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
  const [loading, setLoading] = useState(true);

  // Decode JWT manually
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

        const id = decodeToken();
        setMyId(id);

        if (id) {
          setMyStatuses(allStatuses.filter((s) => s.userId?._id === id));
          setStatuses(allStatuses.filter((s) => s.userId?._id !== id));
        }
      } catch (error) {
        console.error("Failed to fetch statuses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    const mediaType = file.type.startsWith("video") ? "video" : "image";

    navigate("/add-caption", {
      state: { file, preview, mediaType },
    });
  };

  const handleMyStatusClick = () => {
    if (myStatuses.length === 0) {
      document.getElementById("statusUpload").click();
    } else {
      navigate("/status-viewer", { state: { statuses: myStatuses } });
    }
  };

  // Group statuses by user (WhatsApp-style)
  const groupedStatuses = statuses.reduce((acc, status) => {
    const userId = status.userId?._id;
    if (!userId) return acc;

    if (!acc[userId]) {
      acc[userId] = {
        user: status.userId,
        statuses: [],
      };
    }

    acc[userId].statuses.push(status);
    return acc;
  }, {});

  // Skeleton
  const SkeletonItem = () => (
    <div className="recent-item">
      <div className="status-ring skeleton-avatar">
        <div className="status-ring-inner"></div>
      </div>
      <div className="sv-meta">
        <div className="skeleton-line skeleton-name"></div>
        <div className="skeleton-line skeleton-time"></div>
      </div>
    </div>
  );

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

            {myStatuses.length === 0 && (
              <label htmlFor="statusUpload" className="add-status-btn vendify-color">
                <Plus size={14} />
              </label>
            )}

            <input
              type="file"
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
              <label htmlFor="cameraUpload" className="camera-btn vendify-color">
                <Camera size={14} />
              </label>
              <input
                type="file"
                id="cameraUpload"
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
          {loading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
               <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : (
            Object.values(groupedStatuses).map(({ user, statuses }) => {
              const latestStatus = statuses[statuses.length - 1];
              const count = statuses.length;
              const step = 360 / count;
              const gap = 4; // degrees between segments

              // Create conic-gradient for segmented ring
              const segments = Array.from({ length: count })
                .map((_, i) => `#e2df07 ${i * step}deg ${(i + 1) * step - gap}deg`)
                .join(", ");

              return (
                <div
                  key={user._id}
                  className="recent-item"
                  onClick={() =>
                    navigate("/status-viewer", { state: { statuses } })
                  }
                >
                  <div
                    className="status-ring segmented"
                    style={{ background: `conic-gradient(${segments}, #111 0deg)` }}
                  >
                    <div className="status-ring-inner">
                      <img src={latestStatus.mediaUrl} alt={user.brandName} />
                    </div>
                  </div>

                  <div className="sv-meta">
                    <h4 className="recent-name">{user.brandName}</h4>
                    <p className="recent-time">
                      {new Date(latestStatus.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default StatusPage;
