import React, { useState, useEffect } from "react";
import "./CreateStore.css";
import MessageBar from "../../components/MessageBar.jsx";
import LoadingSpinner from "../../components/Loader.jsx";
import bgVideo from "../../assets/vendifyVideo.mp4";
import API from "../../utils/api"; // your axios instance with baseURL + token interceptor
import { useNavigate } from "react-router-dom";
const CreateStore = () => {
    const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    logo: null,
  });
   const user = JSON.parse(localStorage.getItem("user"));
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [storeLink, setStoreLink] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = ['Fashion']
  const handleChange = (e) => {
    if (e.target.files) {
      setForm({ ...form, logo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };



useEffect(() => {
  if (user?.email) {
    setForm(prev => ({ ...prev, email: user.email }));
  }
}, [user?.email]);


    const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Store name is required";
    if (!form.description) newErrors.description = "Description is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.logo) newErrors.logo = "Store logo is required";

    setMsg(newErrors[Object.keys(newErrors)[0] || ""] || "");
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("");
  setType("");
    if (!validate()) {
        setType("error");
        return ;
    }

  try {
  

    setLoading(true);
    console.log("Submitting form data:", form);
      
    const data = new FormData();
    data.append("name", form.name);
    data.append("category", form.category);
    data.append("description", form.description || "");
    data.append("email", form.email);
    data.append("phone", form.phone);
    if (form.logo) data.append("logo", form.logo);

    // Option A (if API interceptor adds token automatically)
    // const res = await API.post("/api/store/create", data);

    // Option B (explicit)
    const token = localStorage.getItem("token");
    // Debug log the token and form data
    console.log('Token:', token);
    console.log('Form data entries:', [...data.entries()]);
    
    const res = await API.post("/api/stores/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
     console.log("Sent:", form);
    setType("success");
    setMsg(res.data.message || "Store created successfully");
    
    // use slug returned by backend:
    const storeId = res.data.store.userId;
    console.log("Store created with ID:", storeId);
    const publicLink = `${window.location.origin}/stores/${res.data.store.storeLink}`;
    localStorage.setItem('store', res.data.store)
    localStorage.setItem('Storelink', publicLink)
    localStorage.setItem("storeId", res.data.store._id);
    console.log(publicLink)
    setStoreLink(publicLink);
    // Redirect to dashboard after a short delay
    setTimeout(() => navigate("/dashboard"), 3000);
  } catch (err) {
    setType("error");
    setMsg(err.response?.data?.message || "Failed to create store");
  } finally {
    setTimeout(() => setMsg(""), 6000);
    setLoading(false);
  }
};

  return (
    <div className="create-store-form">
        {loading && <LoadingSpinner />}
        {msg && <MessageBar type={type} message={msg} />}
        <video className="bg-video-auth" autoPlay loop muted playsInline preload="auto">
                <source src={bgVideo} type="video/mp4" />
              </video>
              <div className="overlay-createPage"></div>
        
      <h2>Create Store</h2>
      <form onSubmit={handleSubmit}>
        {/* <input name="storeName" value={form.storeName} onChange={onChange} placeholder="Store name" required />
        <input name="category" value={form.category} onChange={onChange} placeholder="Category" required />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" />
        <input type="file" name="logo" accept="image/*" onChange={onChange} />
        <button type="submit">Create Store</button> */}
        <div className="form-group">
          <label>Store Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? "input-error" : ""}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={errors.description ? "input-error" : ""}
          />
          {errors.description && <span className="error">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={errors.category ? "input-error" : ""}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? "input-error" : ""}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Store Logo</label>
          <input type="file" name="logo" accept="image/*" onChange={handleChange} />
          {errors.logo && <span className="error">{errors.logo}</span>}
        </div>

        <button type="submit" className="submit-btn">Create Store</button>
      </form>
    </div>
  );
};

export default CreateStore;
