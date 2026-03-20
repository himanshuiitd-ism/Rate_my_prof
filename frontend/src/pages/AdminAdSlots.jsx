import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

const ADMIN_EMAIL = "priyadarshihimanshu6@gmail.com";

export default function AdminAdSlots() {
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [groups, setGroups] = useState([]);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.primaryEmailAddress?.emailAddress === ADMIN_EMAIL);
    }
  }, [user]);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/ads/slots/stats/summary");
      setGroups(Array.isArray(res.data) ? res.data : []);
      setUpdatedAt(new Date());
    } catch (err) {
      setError(err.response?.data?.error || "Failed to load slot stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    fetchStats();
    const intervalId = window.setInterval(fetchStats, 15000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [fetchStats, isAdmin]);

  const totalClicks = useMemo(
    () => groups.reduce((sum, group) => sum + (group.totalClicks || 0), 0),
    [groups],
  );

  const totalSlots = useMemo(
    () => groups.reduce((sum, group) => sum + (group.slots?.length || 0), 0),
    [groups],
  );

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-amber-50 to-orange-50 py-8 px-4">
      <SignedOut>
        <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
          <h1 className="text-2xl font-bold text-red-900">Access Denied</h1>
          <p className="mt-2 text-red-700">
            Please sign in to access this page.
          </p>
        </div>
      </SignedOut>

      <SignedIn>
        {!isAdmin ? (
          <div className="mx-auto max-w-3xl rounded-lg border border-red-200 bg-red-50 px-6 py-8 text-center">
            <h1 className="text-2xl font-bold text-red-900">Unauthorized</h1>
            <p className="mt-2 text-red-700">
              You do not have permission to view slot analytics.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Ad Slot Analytics
                </h1>
                <p className="mt-1 text-gray-600">
                  Every slot ID and click count, grouped by page and position.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/admin/ads"
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Manage Ads
                </Link>
                <button
                  type="button"
                  onClick={fetchStats}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Refresh
                </button>
              </div>
            </div>

            <div className="mb-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Tracked Slots
                </div>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  {totalSlots}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Total Clicks
                </div>
                <div className="mt-1 text-2xl font-bold text-gray-900">
                  {totalClicks}
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <div className="text-xs uppercase tracking-wide text-gray-500">
                  Last Refreshed
                </div>
                <div className="mt-1 text-sm font-semibold text-gray-900">
                  {updatedAt ? updatedAt.toLocaleString() : "Not yet"}
                </div>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {loading && groups.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
                Loading slot stats...
              </div>
            ) : groups.length === 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600">
                No slot click data yet.
              </div>
            ) : (
              <div className="space-y-4">
                {groups.map((group) => (
                  <div
                    key={`${group.page}-${group.position}`}
                    className="rounded-lg border border-gray-200 bg-white shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-4 py-3">
                      <div className="font-semibold text-gray-900">
                        {group.page} / {group.position}
                      </div>
                      <div className="text-sm text-gray-600">
                        Clicks: {group.totalClicks || 0}
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                          <tr>
                            <th className="px-4 py-2 text-left">Slot ID</th>
                            <th className="px-4 py-2 text-left">Index</th>
                            <th className="px-4 py-2 text-left">Ad ID</th>
                            <th className="px-4 py-2 text-left">Clicks</th>
                            <th className="px-4 py-2 text-left">
                              Last Clicked
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(group.slots || []).map((slot) => (
                            <tr
                              key={slot.slotId}
                              className="border-t border-gray-100"
                            >
                              <td className="px-4 py-2 font-mono text-xs text-gray-800">
                                {slot.slotId}
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {slot.slotIndex}
                              </td>
                              <td className="px-4 py-2 font-mono text-xs text-gray-700">
                                {slot.adId || "-"}
                              </td>
                              <td className="px-4 py-2 font-semibold text-gray-900">
                                {slot.clickCount || 0}
                              </td>
                              <td className="px-4 py-2 text-gray-700">
                                {slot.lastClickedAt
                                  ? new Date(
                                      slot.lastClickedAt,
                                    ).toLocaleString()
                                  : "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </SignedIn>
    </div>
  );
}
