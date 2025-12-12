// import React, { useEffect, useState } from "react";
// import "./statusPage.css";
// import { Plus, Camera, MoreVertical } from "lucide-react";
// import BottomNav from "../../components/BottomNav";
// import API from "../../utils/api";
// import { useNavigate } from "react-router-dom";

// const StatusPage = () => {
//   const navigate = useNavigate();
//   const [statuses, setStatuses] = useState([]);
//   const [myStatuses, setMyStatuses] = useState([]);
//   const [myId, setMyId] = useState(null);

//   const decodeToken = () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return null;
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       return payload.id;
//     } catch (err) {
//       console.error("Token decode failed:", err);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const fetchStatuses = async () => {
//       try {
//         const res = await API.get("/api/status/all");
//         const allStatuses = res.data.statuses || [];
//     console.log("All Status", allStatuses)
       
//         const id = decodeToken();
//         setMyId(id);

//         if (!id) return;

       
//         setMyStatuses(allStatuses.filter((s) => s.userId?._id === id));
//         setStatuses(allStatuses.filter((s) => s.userId?._id !== id));
//       } catch (error) {
//         console.error("Failed to fetch statuses:", error);
//       }
//     };

//     fetchStatuses();
//   }, []);


//   const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const preview = URL.createObjectURL(file);
//   const mediaType = file.type.startsWith("video") ? "video" : "image";

//   navigate("/add-caption", {
//     state: { file, preview, mediaType },
//   });
// };


  
//   const handleMyStatusClick = () => {
//     if (myStatuses.length === 0) {
     
//       document.getElementById("statusUpload").click();
//     } else {
   
//       navigate("/status-viewer", { state: { statuses: myStatuses } });
//     }
//   };

//   const handleAnotherUpload =() => {
//     document.getElementById("statusUpload").click();
//   }

//   return (
//     <>
//       <div className="status-page">
//         <div className="status-header">
//           <h1>Status</h1>
//           <MoreVertical className="icon-vertical" />
//         </div>

//         {/* My Status */}
//         <div className="my-status-section">
//           <div className="my-status-avatar" onClick={handleMyStatusClick}>
//             <div className={`status-ring ${myStatuses.length > 0 ? "has-status" : ""}`}>
//               <div className="status-ring-inner">
//                 {myStatuses.length > 0 ? (
//                   <img
//                     src={myStatuses[myStatuses.length - 1].mediaUrl}
//                     alt="My Status"
//                   />
//                 ) : (
//                   <img src="https://via.placeholder.com/80" alt="Your Logo" />
//                 )}
//               </div>
//             </div>

          
//             {myStatuses.length === 0 && (
//               <label htmlFor="statusUpload" className="add-status-btn vendify-color">
//                 <Plus size={14} />
//               </label>
//             )}

//             <input
//               type="file"
//               name="media"
//               id="statusUpload"
//               accept="image/*,video/*"
//               style={{ display: "none" }}
//               onChange={handleFileChange}
//             />
//           </div>

     
//           <div className="flex-status-bar">
//             <div className="add-status-updates">
//               <h2 className="my-store-title">My Store</h2>
//               <p className="my-store-sub">Tap to add product status</p>
//             </div>

//             <div className="status-btn-row" >
//               <label htmlFor="cameraUpload" className="camera-btn vendify-color">
//                 <Camera size={14} />
//               </label>
//               <input
//                 type="file"
//                 name="media"
//                 id="cameraUpload"
//                 accept="image/*,video/*"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//               />
//             </div>
//           </div>
//         </div>

        
//         <h3 className="recent-title">Recent Updates</h3>
//         <div className="recent-list">
//           {statuses.map((status) => (
//             <div
//               key={status._id}
//               className="recent-item"
//               onClick={() =>
//                 navigate("/status-viewer", { state: { statuses: [status] } })
//               }
//             >
//               <div className="status-ring">
//                 <div className="status-ring-inner">
//                   <img src={status.mediaUrl} alt={status.userId.brandName} />
//                 </div>
//               </div>
//               <div className="sv-meta">
//                 <h4 className="recent-name">{status.userId.brandName}</h4>
//                 <p className="recent-time">
//                   {new Date(status.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <BottomNav />
//     </>
//   );
// };

// export default StatusPage;

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
  const [loading, setLoading] = useState(true); // ← ADDED

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
        console.log("All Status", allStatuses);

        const id = decodeToken();
        setMyId(id);

        if (id) {
          setMyStatuses(allStatuses.filter((s) => s.userId?._id === id));
          setStatuses(allStatuses.filter((s) => s.userId?._id !== id));
        }
      } catch (error) {
        console.error("Failed to fetch statuses:", error);
      } finally {
        setLoading(false); // ← ADDED
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

  // Logic to click avatar
  const handleMyStatusClick = () => {
    if (myStatuses.length === 0) {
      document.getElementById("statusUpload").click();
    } else {
      navigate("/status-viewer", { state: { statuses: myStatuses } });
    }
  };

  const handleAnotherUpload = () => {
    document.getElementById("statusUpload").click();
  };

  // ---------- SKELETON COMPONENT (FOR RECENT UPDATES ONLY) ----------
 const SkeletonItem = () => (
  <div className="recent-item">
    {/* SKELETON AVATAR */}
    <div className="status-ring skeleton-avatar">
      <div className="status-ring-inner"></div>
    </div>

    {/* TEXT SKELETONS */}
    <div className="sv-meta">
      <div className="skeleton-line skeleton-name"></div>
      <div className="skeleton-line skeleton-time"></div>
    </div>
  </div>
);

  // ------------------------------------------------------------------

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
              <label htmlFor="cameraUpload" className="camera-btn vendify-color">
                <Camera size={14} />
              </label>
              <input
                type="file"
                name="media"
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
          {/* SHOW SKELETON WHEN LOADING */}
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
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : (
            statuses.map((status) => (
              <div
                key={status._id}
                className="recent-item"
                onClick={() =>
                  navigate("/status-viewer", { state: { statuses: [status] } })
                }
              >
                <div className="status-ring">
                  <div className="status-ring-inner">
                    <img src={status.mediaUrl} alt={status.userId.brandName} />
                  </div>
                </div>
                <div className="sv-meta">
                  <h4 className="recent-name">{status.userId.brandName}</h4>
                  <p className="recent-time">
                    {new Date(status.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </>
  );
};

export default StatusPage;
