import React, { useState, useEffect } from "react";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

const ADMIN_EMAIL = "priyadarshihimanshu6@gmail.com";

const PAGES = ["home", "IIT (ISM) Dhanbad", "IIT Madras"];
const POSITIONS = ["left", "right", "top", "bottom"];

export default function AdminAds() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    linkUrl: "",
    logoUrl: "",
    page: "home",
    position: "left",
    badge: "",
    bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  useEffect(() => {
    if (user) {
      setIsAdmin(user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage("Title and description are required");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        linkUrl: formData.linkUrl.trim() || "#",
        page: formData.page,
        position: formData.position,
        badge: formData.badge.trim() || "",
        bgColor:
          formData.bgColor ||
          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        imageUrl: formData.logoUrl.trim() || "",
        isActive: true,
      };

      await API.post("/ads", payload);

      setMessage("✓ Ad created successfully!");
      setMessageType("success");

      // Reset form
      setFormData({
        title: "",
        description: "",
        linkUrl: "",
        logoUrl: "",
        page: "home",
        position: "left",
        badge: "",
        bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      });

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to create ad");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-4">
      <SignedOut>
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-900 mb-2">
            Access Denied
          </h1>
          <p className="text-red-700">
            Please sign in to access the admin panel.
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        {!isAdmin ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-red-900 mb-2">
              Unauthorized
            </h1>
            <p className="text-red-700">
              You don't have permission to access this page.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Manage Ads</h1>
              <p className="mt-1 text-gray-600">
                Create and manage sponsored ads
              </p>
              <div className="mt-3">
                <Link
                  to="/admin/ad-slots"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  View Slot Analytics
                </Link>
              </div>
            </div>

            {message && (
              <div
                className={`mb-4 rounded-lg border px-4 py-3 text-sm ${
                  messageType === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
            >
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Ad Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Chargeback.io"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Prevent chargebacks on autopilot"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Website Link */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    name="linkUrl"
                    value={formData.linkUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., https://www.chargeback.io/"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Leave empty to disable link
                  </p>
                </div>

                {/* Logo URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Logo/Image URL
                  </label>
                  <input
                    type="url"
                    name="logoUrl"
                    value={formData.logoUrl}
                    onChange={handleInputChange}
                    placeholder="e.g., https://example.com/logo.png"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Page Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Display on Page *
                  </label>
                  <select
                    name="page"
                    value={formData.page}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {PAGES.map((page) => (
                      <option key={page} value={page}>
                        {page}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Position Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Position *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos.charAt(0).toUpperCase() + pos.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Badge (optional)
                  </label>
                  <input
                    type="text"
                    name="badge"
                    value={formData.badge}
                    onChange={handleInputChange}
                    placeholder="e.g., NEW, HOT, SALE, FREE"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Background Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Background Color/Gradient
                  </label>
                  <input
                    type="text"
                    name="bgColor"
                    value={formData.bgColor}
                    onChange={handleInputChange}
                    placeholder="e.g., #667eea or linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                  />
                  <div
                    className="mt-2 h-12 rounded-lg border border-gray-200"
                    style={{ background: formData.bgColor }}
                  ></div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 transition"
                >
                  {loading ? "Creating..." : "Create Ad"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Preview Section */}
            <div className="mt-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Preview</h2>
              <div
                className="rounded-lg overflow-hidden shadow-md transition-all hover:shadow-lg cursor-pointer"
                style={{
                  background: formData.bgColor || "#1e293b",
                  minHeight: "140px",
                  color: "#fff",
                }}
              >
                <div className="p-3 h-full flex flex-col justify-between">
                  {formData.badge && (
                    <div className="inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold text-white w-fit">
                      {formData.badge}
                    </div>
                  )}
                  <div className="font-bold text-sm mt-1">
                    {formData.title || "Ad Title"}
                  </div>
                  <div className="text-xs text-white/80 line-clamp-3 leading-relaxed">
                    {formData.description || "Ad description will appear here"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  );
}
