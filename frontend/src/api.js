import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

function getAuthConfig(token) {
  if (!token) {
    return { withCredentials: true };
  }
  return {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  };
}

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

export async function trackAdClick(adId) {
  const res = await API.post(`/ads/${adId}/click`);
  return res.data;
}

// ── Communities API ─────────────────────────────────────────────

export async function fetchCommunities(params = {}) {
  const res = await API.get("/communities", { params });
  return res.data; // { joined, others }
}

export async function createCommunity(payload, token) {
  const res = await API.post("/communities", payload, getAuthConfig(token));
  return res.data;
}

export async function joinCommunity(id, token, payload = {}) {
  const res = await API.post(
    `/communities/${id}/join`,
    payload,
    getAuthConfig(token),
  );
  return res.data;
}

export async function createFeatureSuggestion(payload, token) {
  const res = await API.post(
    "/feature-suggestions",
    payload,
    getAuthConfig(token),
  );
  return res.data;
}

export async function fetchFeatureSuggestions() {
  const res = await API.get("/feature-suggestions");
  return res.data;
}

export async function voteFeatureSuggestion(id, token) {
  const res = await API.post(
    `/feature-suggestions/${id}/vote`,
    null,
    getAuthConfig(token),
  );
  return res.data;
}

export async function fetchCommunityMessages(id, { cursor, limit = 50 } = {}) {
  const params = {};
  if (cursor) params.cursor = cursor;
  if (limit) params.limit = limit;
  const res = await API.get(`/communities/${id}/messages`, { params });
  return res.data; // { community, messages, nextCursor }
}

export async function sendCommunityMessage(id, payload, token) {
  const res = await API.post(
    `/communities/${id}/messages`,
    payload,
    getAuthConfig(token),
  );
  return res.data;
}

export async function likeCommunityMessage(communityId, messageId, token) {
  const res = await API.post(
    `/communities/${communityId}/messages/${messageId}/like`,
    null,
    getAuthConfig(token),
  );
  return res.data;
}

export async function reportCommunityMessage(communityId, messageId, token) {
  const res = await API.post(
    `/communities/${communityId}/messages/${messageId}/report`,
    null,
    getAuthConfig(token),
  );
  return res.data;
}

export async function deleteCommunityMessage(communityId, messageId, token) {
  const res = await API.delete(
    `/communities/${communityId}/messages/${messageId}`,
    getAuthConfig(token),
  );
  return res.data;
}

export async function removeCommunityMember(communityId, memberId, token) {
  const res = await API.post(
    `/communities/${communityId}/remove-member`,
    { memberId },
    getAuthConfig(token),
  );
  return res.data;
}

export async function uploadCommunityFile(communityId, file, token) {
  const formData = new FormData();
  formData.append("file", file);
  const config = getAuthConfig(token);
  config.headers = {
    ...(config.headers || {}),
    "Content-Type": "multipart/form-data",
  };
  const res = await API.post(`/communities/${communityId}/upload`, formData, {
    ...config,
  });
  return res.data; // { fileUrl }
}
