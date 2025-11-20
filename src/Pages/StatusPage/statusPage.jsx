import React from "react";
import "./statusPage.css";
import { Plus, Camera, Image as ImageIcon, MoreVertical } from "lucide-react";

const StatusPage =() =>{
  const sampleStatuses = [
    {
      id: 1,
      storeName: "FashionHub",
      logo: "https://via.placeholder.com/60",
      time: "Today, 8:30 AM",
    },
    {
      id: 2,
      storeName: "TechZone",
      logo: "https://via.placeholder.com/60",
      time: "Yesterday, 4:22 PM",
    },
    {
      id: 3,
      storeName: "BeautyWave",
      logo: "https://via.placeholder.com/60",
      time: "Yesterday, 9:10 AM",
    },
  ];

  return (
    <div className="status-page">
      {/* Header */}
      <div className="status-header">
        <h1>Status</h1>
        <MoreVertical className="icon" />
      </div>

      {/* Add Status Section */}
      <div className="my-status-section">
        <div className="my-status-avatar">
          <img
            src="https://via.placeholder.com/80"
            alt="Your Logo"
            className="my-status-img"
          />
          <div className="add-status-btn">
            <Plus size={14} />
          </div>
        </div>
        <div>
          <h2 className="my-store-title">My Store</h2>
          <p className="my-store-sub">Tap to add product status</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="status-btn-row">
        <button className="camera-btn">
          <Camera size={18} /> Camera
        </button>
        <button className="gallery-btn">
          <ImageIcon size={18} /> Gallery
        </button>
      </div>

      {/* Recent Updates */}
      <h3 className="recent-title">Recent Updates</h3>

      <div className="recent-list">
        {sampleStatuses.map((status) => (
          <div key={status.id} className="recent-item">
            <div className="status-ring">
              <div className="status-ring-inner">
                <img src={status.logo} alt={status.storeName} />
              </div>
            </div>
            <div>
              <h4 className="recent-name">{status.storeName}</h4>
              <p className="recent-time">{status.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusPage