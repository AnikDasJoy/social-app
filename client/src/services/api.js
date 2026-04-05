// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export const loginUser = (data) => API.post("/auth/login", data);
// export const getFeed = () =>
//   API.get("/posts", {
//     headers: { Authorization: localStorage.getItem("token") },
//   });

// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Add this
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;