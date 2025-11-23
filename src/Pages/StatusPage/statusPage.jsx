import React from "react";
import "./statusPage.css";
import { Plus, Camera, Image as ImageIcon, MoreVertical } from "lucide-react";
import BottomNav from "../../components/BottomNav";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const StatusPage =() =>{
  const navigate = useNavigate()
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

const handleFileChange = async (e) => {
  try {
    const file = e.target.files[0];
    if (!file) return;

    const form = new FormData();
    form.append("media", file); // MUST match backend field name
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

    // Navigate to caption page
    navigate("/add-caption", {
      state: { mediaUrl },
    });
  } catch (error) {
    console.error("Upload failed:", error);
  }
};



  return (
    <>
    <div className="status-page">
      {/* Header */}
      <div className="status-header">
        <h1>Status</h1>
        <MoreVertical className="icon-vertical" />
      </div>

      {/* Add Status Section */}
      <div className="my-status-section">
        <div className="my-status-avatar">
          <img
            src="https://via.placeholder.com/80"
            alt="Your Logo"
            className="my-status-img"
          />
          {/* <div className="add-status-btn">
            <Plus size={14} />
          </div> */}
          <label htmlFor="statusUpload" className="add-status-btn">
            <Plus size={14} />
          </label>

          <input
           type="file"
           name="media" 
           id="statusUpload"
           accept="image/*,video/*"
           style={{ display: "none" }}
           onChange={(e) => handleFileChange(e)}
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
           onChange={(e) => handleFileChange(e)}
          />
          </div>    
        </div>
      </div>

      {/* Buttons */}
      

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
    <BottomNav />
    </>
  );
}

export default StatusPage