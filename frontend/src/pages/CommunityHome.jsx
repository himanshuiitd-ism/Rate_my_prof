import React, { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import { fetchCommunities, createCommunity } from "../api";

export default function CommunityHome() {
  const location = useLocation();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [joined, setJoined] = useState([]);
  const [others, setOthers] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    description: "",
  });

  const collegeIdFromState = location.state?.collegeId || null;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCommunities({
          collegeId: collegeIdFromState || undefined,
          search: search || undefined,
        });
        if (!cancelled) {
          setJoined(data.joined || []);
          setOthers(data.others || []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load communities");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [search, collegeIdFromState]);

  const allCommunities = useMemo(
    () => [...joined, ...others],
    [joined, others],
  );

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!createForm.name.trim()) return;
    try {
      setLoading(true);
      const token = await getToken();
      const created = await createCommunity(
        {
          ...createForm,
          collegeId: collegeIdFromState || null,
          creatorDisplayName: user?.fullName || user?.username || "Creator",
        },
        token,
      );
      setJoined((prev) => [created, ...prev]);
      setShowCreate(false);
      setCreateForm({ name: "", description: "" });
    } catch (err) {
      setError(err.message || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <main className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 md:flex-row">
        {/* Left intro panel */}
        <section className="md:w-2/5">
          <div className="rounded-2xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-5 py-5 shadow-xl shadow-black/40">
            <h1 className="mb-2 text-3xl font-semibold tracking-tight text-white">
              College Communities
            </h1>
            <p className="text-sm text-slate-300">
              Discover focused groups for your campus. Read all conversations
              without signing in, or join a community to start posting.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <p className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                  ✓
                </span>
                Joined groups appear first across the app.
              </p>
              <p className="inline-flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/20 text-sky-300">
                  ⤴
                </span>
                Conversations are ordered like a professional chat feed.
              </p>
            </div>
          </div>
        </section>

        {/* Right content panel */}
        <section className="md:w-3/5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.65" y1="16.65" x2="21" y2="21" />
                </svg>
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search communities…"
                className="w-full rounded-full border border-slate-700 bg-slate-900 pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500"
              />
            </div>
            <SignedIn>
              <button
                type="button"
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <span className="text-lg leading-none">＋</span>
                <span>Create community</span>
              </button>
            </SignedIn>
            <SignedOut>
              <a
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full border border-slate-600 px-4 py-2 text-sm font-medium text-slate-100 bg-slate-900 hover:bg-slate-800"
              >
                Sign in to create
              </a>
            </SignedOut>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <div className="py-8 text-center text-sm text-slate-400">
              Loading communities…
            </div>
          )}

          {!loading && allCommunities.length === 0 && (
            <div className="rounded-2xl border border-slate-700 bg-slate-900 py-10 text-center text-sm text-slate-300">
              No communities yet.{" "}
              {user
                ? "Create the first one for your campus."
                : "Sign in to start one."}
            </div>
          )}

          {!loading && allCommunities.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {joined.map((c) => (
                <CommunityCard key={c._id} community={c} joined />
              ))}
              {others.map((c) => (
                <CommunityCard key={c._id} community={c} joined={false} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Simple create dialog */}
      {showCreate && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-900 p-5 shadow-lg">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Create community
            </h2>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Name
                </label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) =>
                    setCreateForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={createForm.description}
                  onChange={(e) =>
                    setCreateForm((f) => ({
                      ...f,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function CommunityCard({ community, joined }) {
  return (
    <Link
      to={`/media/community/${community._id}`}
      className="flex h-full flex-col rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm shadow-sm hover:border-sky-500 hover:shadow-md transition"
    >
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-semibold text-slate-100 line-clamp-1">
          {community.name}
        </h3>
        {joined && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-500/30">
            Joined
          </span>
        )}
      </div>
      <p className="mb-2 line-clamp-2 text-xs text-slate-400">
        {community.description || "No description yet."}
      </p>
      <div className="mt-auto flex items-center justify-between text-[11px] text-slate-500">
        <span>{community.memberCount || 0} members</span>
        <span>{community.collegeId || "All colleges"}</span>
      </div>
    </Link>
  );
}
