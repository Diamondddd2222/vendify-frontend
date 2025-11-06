import axios from "axios";

const API = axios.create({
  baseURL: "https://vendify-backend.onrender.com/", // replace with your Render backend URL
});

// Optionally attach token for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
