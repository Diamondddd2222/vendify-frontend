
// FULL DASHBOARD USING REACT QUERY + CONTENT-AWARE SKELETONS

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import API from "../../utils/api";
import { FaRegBell } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";
import bgVideo from "../../assets/vendifyVideo.mp4";
import TrueDashboard from "./TrueDashboard.jsx";
import FalseDashboard from "./FalseDashboard.jsx";
import MessageBar from "../../components/MessageBar.jsx";
import BottomNav from "../../components/BottomNav.jsx";
import "./Dashboard.css";
import StorySkeleton from "../../components/skeletons/StorySkeleton.jsx";
import VendorCardSkeleton from "../../components/skeletons/VendorCardSkeleton.jsx";
import StoreDashboardSkeleton from "../../components/skeletons/StoreDashboardSkeleton.jsx";

// ---------------------------------------------------------

const Dashboard = () => {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  // ------------------ React Query: Fetch Stores ------------------
  const {
    data: stores = [],
    isLoading: loadingStores,
  } = useQuery({
    queryKey: ["storesList"],
    queryFn: async () => {
      const res = await API.get("/api/stores/reqstores");
      return res.data.allStores;
    },
  });

  // ------------------ React Query: Fetch Users ------------------
  const {
    data: users = [],
    isLoading: loadingUsers,
  } = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => {
      const res = await API.get("/api/users");
      return res.data;
    },
  });

  // ------------------ React Query: Fetch User Store ------------------
  const {
    data: storeData,
    isLoading: loadingStore,
  } = useQuery({
    queryKey: ["userStore"],
    queryFn: async () => {
      const res = await API.get("/api/stores");
      return res.data.store;
    },
  });

  const store = storeData || null;

  // Create store link
  let storeLink = null;
  let storeId = null;

  if (store) {
    const url = new URL(window.location.href);
    const hostname = `www.${url.hostname.replace(/^www\\./, "")}`;
    storeLink = `${hostname}/stores/${store.storeLink}`;
    storeId = store._id;

    localStorage.setItem("Storelink", storeLink);
    localStorage.setItem("storeId", storeId);
  }

  return (
    <>
      <div className="dashboard-container">
        <MessageBar type={type} message={message} />

        {/* Background Video */}
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
              <SlEarphonesAlt className="customer-support" />
            </div>
          </div>

          <p>
            Grow your store and connect with vendors on{" "}
            <span className="highlight-p">Vendify</span>
          </p>
        </header>

        {/* Store Section */}
        <section className="create-store-section">
          {loadingStore ? (
            <StoreDashboardSkeleton />
          ) : store ? (
            <TrueDashboard storeLink={storeLink} storeId={storeId} />
          ) : (
            <FalseDashboard />
          )}
        </section>

        {/* Stories Section */}
        <section className="stories-section">
          <h2 className="recent-text">Recent updates</h2>
          <div className="stories-container">
            {loadingStores ? (
              [...Array(6)].map((_, i) => <StorySkeleton key={i} />)
            ) : stores.length > 0 ? (
              stores.map((store, index) => (
                <div className="story" key={index}>
                  <div className="story-ring">
                    <div className="story-inner">
                      {store.logoUrl ? (
                        <img
                          src={store.logoUrl}
                          alt={store.name}
                          className="story-logo"
                        />
                      ) : (
                        <span className="story-text">
                          {store.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="story-name">{store.name.split(" ")[0]}</p>
                </div>
              ))
            ) : (
              <p>No recent updates</p>
            )}
          </div>
        </section>

        {/* Vendor Feed */}
        <section className="vendor-feed">
          <h2 className="vendors-texts">Vendors you may know</h2>

          <div className="vendor-grid">
            {loadingUsers ? (
              [...Array(6)].map((_, i) => <VendorCardSkeleton key={i} />)
            ) : (
              users.slice(0, 6).map((vendor, i) => (
                <div className="vendor-card" key={i}>
                  <h4>{vendor.name}</h4>
                  <p>{vendor.email}</p>

                  <button className="view-btn">View Store</button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      <BottomNav />
    </>
  );
};

export default Dashboard;
