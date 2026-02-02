import axios from "axios";

const API = axios.create({
  baseURL: "https://rate-my-proff.onrender.com/api",
});

export async function fetchProfs() {
  const res = await API.get("/professors"); // ← Missing "/api"
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
