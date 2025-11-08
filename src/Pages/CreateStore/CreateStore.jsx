import React, { useState } from "react";
import API from "../../utils/api"; // your axios instance with baseURL + token interceptor

const CreateStore = () => {
  const [form, setForm] = useState({
    storeName: "",
    category: "",
    description: "",
    logo: null,
  });
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const onChange = (e) => {
    if (e.target.files) {
      setForm({ ...form, logo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setType("");

  try {
    const data = new FormData();
    data.append("storeName", formData.storeName);
    data.append("category", formData.category);
    data.append("description", formData.description || "");
    if (formData.logo) data.append("logo", formData.logo);

    // Option A (if API interceptor adds token automatically)
    // const res = await API.post("/api/store/create", data);

    // Option B (explicit)
    const token = localStorage.getItem("token");
    const res = await API.post("/api/store/create", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setType("success");
    setMessage(res.data.message || "Store created successfully");
    // use slug returned by backend:
    const publicLink = `${window.location.origin}/stores/${res.data.store.storeLink}`;
    setStoreLink(publicLink);
  } catch (err) {
    setType("error");
    setMessage(err.response?.data?.message || "Failed to create store");
  } finally {
    setTimeout(() => setMessage(""), 6000);
  }
};

  return (
    <div className="create-store-form">
      <h2>Create Store</h2>
      {msg && <div className={`msg ${type}`}>{msg}</div>}
      <form onSubmit={onSubmit}>
        <input name="storeName" value={form.storeName} onChange={onChange} placeholder="Store name" required />
        <input name="category" value={form.category} onChange={onChange} placeholder="Category" required />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Description" />
        <input type="file" name="logo" accept="image/*" onChange={onChange} />
        <button type="submit">Create Store</button>
      </form>
    </div>
  );
};

export default CreateStore;
