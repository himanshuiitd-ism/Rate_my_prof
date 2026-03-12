import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
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

export async function submitMessage(id, message) {
  const res = await API.post(`/professors/${id}/message`, { message });
  return res.data;
}

export async function fetchAds(page = "home") {
  const res = await API.get(`/ads?page=${encodeURIComponent(page)}`);
  return res.data;
}
