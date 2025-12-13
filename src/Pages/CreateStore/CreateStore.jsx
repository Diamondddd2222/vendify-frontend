import React, { useState, useEffect } from "react";
import "./CreateStore.css";
import MessageBar from "../../components/MessageBar.jsx";
import LoadingSpinner from "../../components/Loader.jsx";
import bgVideo from "../../assets/vendifyVideo.mp4";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

const TOTAL_STEPS = 3;

const CreateStore = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    logo: null,
  });

  const categories = ["Fashion"];

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }));
    }
  }, [user?.email]);

  const handleChange = (e) => {
    if (e.target.files) {
      setForm({ ...form, logo: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  /* ---------------- VALIDATION PER STEP ---------------- */
  const validateStep = () => {
    if (step === 1) {
      if (!form.name || !form.category || !form.description) {
        setMsg("Please complete all store details");
        setType("error");
        return false;
      }
    }
    if (step === 2) {
      if (!form.email || !form.phone) {
        setMsg("Please provide contact information");
        setType("error");
        return false;
      }
    }
    if (step === 3) {
      if (!form.logo) {
        setMsg("Please upload a store logo");
        setType("error");
        return false;
      }
    }
    setMsg("");
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const prevStep = () => {
    setMsg("");
    setStep((s) => s - 1);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        data.append(key, value)
      );

      const token = localStorage.getItem("token");

      const res = await API.post("/api/stores/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setType("success");
      setMsg("Store created successfully 🎉");

      const store = res.data.store;
      const url = new URL(window.location.href);
      const hostname = `www.${url.hostname.replace(/^www\./, "")}`;
      const publicLink = `${hostname}/stores/${store.storeLink}`;

      localStorage.setItem("store", JSON.stringify(store));
      localStorage.setItem("Storelink", publicLink);
      localStorage.setItem("storeId", store._id);

      setTimeout(() => navigate("/dashboard"), 2500);
    } catch (err) {
      setType("error");
      setMsg(err.response?.data?.message || "Failed to create store");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-store-form">
      {loading && <LoadingSpinner />}
      {msg && <MessageBar type={type} message={msg} />}

      {/* <video className="bg-video-auth" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlay-createPage"></div> */}

      {/* -------- PROGRESS -------- */}
      <div className="progress-wrapper">
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <p className="progress-text">Step {step} of {TOTAL_STEPS}</p>
      </div>

      <h2>Create Store</h2>

      <form onSubmit={handleSubmit} className="step-form">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="step-card fade">
            <div className="form-group">
              <label>Store Name</label>
              <input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step-card fade">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="step-card fade">
            <div className="form-group">
              <label>Store Logo</label>
              <input type="file" accept="image/*" onChange={handleChange} />
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="step-actions">
          {step > 1 && (
            <button type="button" className="secondary-btn" onClick={prevStep}>
              Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button type="button" className="primary-btn" onClick={nextStep}>
              Continue
            </button>
          ) : (
            <button type="submit" className="primary-btn">
              Create Store
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
