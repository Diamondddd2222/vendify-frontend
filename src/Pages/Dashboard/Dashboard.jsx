import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import API from "../../utils/api";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     setUser(storedUser);

//     // Fetch all users for the "stories" section
//     const fetchUsers = async () => {
//       try {
//         const res = await API.get("/api/users");
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Failed to load users", err);
//       }
//     };

//     fetchUsers();
//   }, []);

useEffect(() => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("Stored user from localStorage:", storedUser);
    setUser(storedUser && Object.keys(storedUser).length ? storedUser : null);
  } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
    setUser(null);
  }

  const fetchUsers = async () => {
    try {
      const res = await API.get("/api/users");
      setUsers(res.data);
      console.log(res.data)
      console.log(users)
    } catch (err) {
      console.error("Failed to load users", err);
    }
  };

  fetchUsers();
}, []);

  return (
    <div className="vendify-dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.name || "Vendor"} 👋</h1>
        <p>Your marketplace journey starts here.</p>
      </header>

      <section className="dashboard-main">
        <div className="create-store-card">
          <h2>Create Your Store 🏪</h2>
          <p>Start selling products and grow your brand on Vendify.</p>
          <button className="create-btn">Create Store</button>
        </div>

        <div className="user-stories">
          <h3>Explore Vendors</h3>
          <div className="stories-scroll">
            {users.map((u) => (
              <div key={u._id} className="story">
                <img
                  src={
                    u.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/219/219970.png"
                  }
                  alt={u.name}
                />
                <p>{u.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="explore-section">
        <h2>Discover Trending Stores 🔥</h2>
        <div className="store-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="store-card">
              <img
                src={`https://source.unsplash.com/random/400x40${i}?shop`}
                alt="store"
              />
              <h4>Store #{i}</h4>
              <p>New arrivals and amazing deals await you!</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
