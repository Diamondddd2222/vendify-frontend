import React, { useEffect, useState } from "react";
import API from "../../utils/api";
import { FaRegBell } from "react-icons/fa";
import { SlEarphonesAlt } from "react-icons/sl";
import bgVideo from "../../assets/vendifyVideo.mp4";
import { Link, useNavigate } from "react-router-dom";
import TrueDashboard from "./TrueDashboard.jsx";
import FalseDashboard from "./FalseDashboard.jsx";
import MessageBar from "../../components/MessageBar.jsx";
import "./Dashboard.css";
import Loader from "../../components/Loader.jsx";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [storeLink, setStoreLink] = useState("");
  const [storeId, setStoreId] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [store, setStore] = useState({});
  const [stores, setStores] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
//   const store = JSON.parse(localStorage.getItem("store"));
  const [storeBrand, setStoreBrand] = useState("");
  console.log("User data in Dashboard:", user)
  

//  useEffect(() => {
//   const fetchStores = async () => {
//     try {
//       const res = await API.get("/api/stores/reqstores"); // 👈 your getStores endpoint
//       const fetchedStores = res.data.allStores;
//       setStores(fetchedStores);
//       console.log("Fetched stores:", res.data.allStores);
//       console.log('stores', stores)
//     } catch (err) {
//       console.error("Failed to load stores", err);
//     }
//   };
//   fetchStores();
// }, []);

useEffect(() => {
  const fetchStores = async () => {
    try {
      const res = await API.get("/api/stores/reqstores");
      const fetchedStores = res.data.allStores;
      setStores(fetchedStores);
      console.log("Fetched stores directly:", fetchedStores); // log here
    } catch (err) {
      console.error("Failed to load stores", err);
    }
  };
  fetchStores();
}, []);




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

  useEffect(() => {
  const fetchUserStore = async () => {
    try {
      console.log("Fetching store for user:", user?.email);
      const token = localStorage.getItem("token");
      console.log("Using token:", token);

      const res = await API.get("/api/stores");
      console.log("Store fetch response:", res.data);

      const store = res.data.store;

      // -------------- NEW CLEAN WWW LINK FORMAT ----------------
      const url = new URL(window.location.href);

      // force hostname to always include www.
      const hostname = `www.${url.hostname.replace(/^www\./, "")}`;

      const publicLink = `${hostname}/stores/${store.storeLink}`;
      console.log("Public WWW link:", publicLink);

      // ----------------------------------------------------------

      setStoreLink(publicLink);
      setStoreId(store._id);
      setStore(store);

      localStorage.setItem("Storelink", publicLink);
      localStorage.setItem("storeId", store._id);

    } catch (err) {
      console.error("User has no store yet:", err.response?.data?.message);
      setTimeout(() => {
        setType("pending");
        setMessage("Create a store to get started!");
      }, 1000);
      setMessage("");
      setStoreLink(null);
    } finally {
      // Hide message after 4 seconds
      setTimeout(() => setMessage(""), 4000);
    }
  };

  fetchUserStore();
}, []);


//   useEffect(() => {
//   const fetchUserStore = async () => {
//     try {
//      console.log("Fetching store for user:", user?.email);
//       const token = localStorage.getItem("token");
//       console.log("Using token:", token);
//       const res = await API.get("/api/stores");
//       console.log("Store fetch response:", res.data);
//       const store = res.data.store;
//       const link = `${window.location.origin}/stores/${store.storeLink}`;
//       setStoreLink(link);
//       console.log("Fetched store link:", storeLink);
//       setStoreId(store._id);
//       setStore(store)
      
//       localStorage.setItem("Storelink", link);
//       localStorage.setItem("storeId", store._id);
//     } catch (err) {
//       console.error("User has no store yet:", err.response?.data?.message);
//       setTimeout(() => {
//         setType("pending");
//         setMessage("Create a store to get started!");
//       }, 1000);
//       setMessage("")
//       setStoreLink(null);
//     }finally {
   
//     setTimeout(() => setMessage(""), 4000);
//   }
//   };

//   fetchUserStore();
// }, []);

// useEffect(() => {
//     const storedLink = localStorage.getItem("Storelink");
//     const storedId = localStorage.getItem("storeId");
//     if (storedLink && storedId) {
//         setStoreLink(storedLink);
//         setStoreId(storedId);
//         console.log("Loaded store link from localStorage:", storedLink);
//     }else{
//         setStoreLink("");
//         setStoreId("");

//     }
// }, [ storeId]);


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
//   useEffect(() => {
    
//     const savedLink = localStorage.getItem("Storelink");
//     const storedId = localStorage.getItem("storeId");
//     console.log("Retrieved store link from localStorage:", savedLink);
//     if (savedLink && storeId) {
//       setStoreLink(savedLink);
//       setStoreId(storedId);
      
//     }
//   }, []);

    // const navigateToCreatePage = () => {
    //     navigate("/CreateStore");
    // };

  return (
    <div className="dashboard-container">
      <MessageBar type={type} message={message} />
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
           storeLink ?  <TrueDashboard storeLink={storeLink} storeId={storeId}/>: <FalseDashboard/>  
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
        <h2>Recent updates</h2>
        <div className="stories-container">
  {stores.length > 0 ? (
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
    <p className="loading-text"><Loader/></p>
  )}
</div>

      </section>

    

      {/* Vendor Feed */}
      <section className="vendor-feed">
        <h2>Vendors You May Know</h2>
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
