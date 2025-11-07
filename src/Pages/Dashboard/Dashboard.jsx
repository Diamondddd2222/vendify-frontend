import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { FaRegBell } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";
import "./Dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

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

  return (
    <div className="dashboard-container">
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

      {/* Create Store */}
      <section className="create-store-section">
        <div className="create-store-card">
          <h3>Create Your Store</h3>
          <p>
            Set up your personal Vendify store, upload products, and start
            building your trusted brand online.
          </p>
          <button className="create-btn">Create Store</button>
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
