import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:4001/api" || "https://rate-my-prof.onrender.com/api",
});

export async function fetchProfs(college) {
  const params = college ? { college } : {};
  const res = await API.get("/professors", { params });
  return res.data;
}

export async function fetchProf(id) {
  const res = await API.get(`/professors/${id}`);
  return res.data;
}

export async function submitRating(id, payload) {
  const res = await API.post(`/professors/${id}/rate`, payload);
  return res.data;
}

export async function fetchAds(page = "home") {
  const res = await API.get(`/ads?page=${encodeURIComponent(page)}`);
  return res.data;
}
