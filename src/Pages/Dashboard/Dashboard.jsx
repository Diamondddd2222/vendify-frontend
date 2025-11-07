import React, { useEffect, useState } from "react";
import API from "../../utils/api";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white font-poppins px-6 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-yellow-400">
          Welcome, {user?.name || "Vendor"} 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Let’s grow your store together on <span className="text-yellow-400">Vendify</span>
        </p>
      </div>

      {/* Stories Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Vendors You May Know</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {users.length > 0 ? (
            users.map((vendor, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 p-[3px] cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-sm text-white">
                  {vendor.name.charAt(0).toUpperCase()}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading vendors...</p>
          )}
        </div>
      </div>

      {/* Create Store Card */}
      <div className="mt-10 bg-gray-800/60 rounded-2xl p-6 shadow-lg border border-gray-700">
        <h3 className="text-2xl font-semibold mb-3 text-yellow-400">Create Your Store</h3>
        <p className="text-gray-300 mb-6">
          Set up your personal Vendify store in minutes. Showcase your products,
          get verified, and start selling with confidence.
        </p>
        <button className="bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full hover:bg-yellow-300 transition">
          Create Store
        </button>
      </div>

      {/* Placeholder for Feed */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Discover More Vendors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.slice(0, 6).map((vendor, i) => (
            <div
              key={i}
              className="bg-gray-800/70 p-4 rounded-xl hover:scale-105 transition-transform border border-gray-700"
            >
              <h3 className="text-yellow-400 text-lg font-medium">{vendor.name}</h3>
              <p className="text-gray-400 text-sm">{vendor.email}</p>
              <button className="mt-3 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
                View Store
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
