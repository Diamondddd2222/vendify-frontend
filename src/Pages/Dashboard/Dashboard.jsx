 import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { FaRegBell } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";
import bgVideo from "../../assets/vendifyVideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import TrueDashboard from "./TrueDashboard.jsx";
import FalseDashboard from "./FalseDashboard.jsx";
import "./Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [storeLink, setStoreLink] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [storeBrand, setStoreBrand] = useState("");
  console.log("User data in Dashboard:", user)
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    fetchUsers();
  }, []);

//   useEffect(() => {
//     if (user?._Id) {
//       setStoreBrand(user.brandName);
//       const link = `${window.location.origin}/stores/${user.storeBrand}`;
//       setStoreLink(link);
//       localStorage.setItem("Storelink", link);
//     } else {
//       setStoreLink(null);
//     }
//      }, []);
//     if 
//    const storeLink= localStorage.getItem("Storelink");
//     setStoreLink(storeLink)
//     console.log(storeLink);
 

  // Load store link from localStorage
  useEffect(() => {
    const savedLink = localStorage.getItem("Storelink");
    if (savedLink) {
      setStoreLink(savedLink);
    }
  }, []);

    // const navigateToCreatePage = () => {
    //     navigate("/CreateStore");
    // };

  return (
    <div className="dashboard-container">
        <video className="bg-video-auth" autoPlay loop muted playsInline>
                <source src={bgVideo} type="video/mp4" />
              </video>
              <div className="overlay-auth-dashboard"></div>
      {/* Header */}
      <header className="dashboard-header">
        <div className="h-section">
           <h1 className="text-brand">
             Hey, <span className="highlight">{user?.name || "Vendor"}</span> 
           </h1>
           <div className="h-icons">
            
              <FaRegBell className="notification-bell" />
              <SlEarphonesAlt className="customer-support"/>
           </div>
           
        </div>
       
        {/* <h1 className="welcome-text">Welcome, <span className="highlight">{user?.name || "Vendor"}</span> 👋</h1> */}
        <p>Grow your store and connect with vendors on <span className="highlight-p">Vendify</span></p>
      </header>

      {/* Create Store */}
      <section className="create-store-section">
        {
            !storeLink ? <FalseDashboard/>  : <TrueDashboard storeLink={storeLink} />
        }
        {/* <div className="create-store-card">
            <div className="your-store-link-sec">
                <div className="link-txt">
                    <div className="safety-icon-container">
                        <AiFillSafetyCertificate className="safety-icon"/>
                    </div>
                   
                   <Link className="store-link">Your Store Link</Link>
                </div>
                <Link className="view-store">View Store</Link>
            </div>
               

            <div className="creating-store">
             <h3 className="create-store-text">Create Your Store</h3>
             <button onClick={navigateToCreatePage} className="create-btn">Create Store</button>
            </div>
        </div> */}

        
      </section>

      {/* <div className="create-store-card"> 
            <div className="store-first">
               <p className="store-link">Your store link</p>
                <h3>Create Your Store</h3>  
            </div>
          
          <div className="store-second">
           <p className="view-store-link">
                View Store
              
            </p>
            <button className="create-btn">Create Store</button>
          </div>
            
        </div> */}

      {/* Stories Section */}
      <section className="stories-section">
        <h2>Vendors You May Know</h2>
        <div className="stories-container">
          {users.length > 0 ? (
            users.map((vendor, index) => (
              <div className="story" key={index}>
                <div className="story-ring">
                  <div className="story-inner">
                    <span className="story-text">
                      {vendor.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="story-name">{vendor.name.split(" ")[0]}</p>
              </div>
            ))
          ) : (
            <p className="loading-text">Loading vendors...</p>
          )}
        </div>
      </section>

    

      {/* Vendor Feed */}
      <section className="vendor-feed">
        <h2>Discover Vendors</h2>
        <div className="vendor-grid">
          {users.slice(0, 6).map((vendor, i) => (
            <div className="vendor-card" key={i}>
              <h4>{vendor.name}</h4>
              <p>{vendor.email}</p>
              <button className="view-btn">View Store</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
