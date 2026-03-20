import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useUser, useAuth, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  fetchCommunities,
  fetchCommunityMessages,
  joinCommunity,
  sendCommunityMessage,
} from "../api";

export default function CommunityPage() {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useUser();
  const { getToken } = useAuth();

  const [communitiesJoined, setCommunitiesJoined] = useState([]);
  const [communitiesOthers, setCommunitiesOthers] = useState([]);
  const [community, setCommunity] = useState(null);
  const [messages, setMessages] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [gifResults, setGifResults] = useState([]);
  const [gifQuery, setGifQuery] = useState("");
  const [showGifPicker, setShowGifPicker] = useState(false);

  const GIPHY_KEY = import.meta.env.VITE_GIPHY_API_KEY;

  const collegeIdFromState = location.state?.collegeId || null;

  useEffect(() => {
    let cancelled = false;
    async function loadCommunitiesAndMessages() {
      try {
        setError(null);
        setLoadingMessages(true);
        const [communityList, messageData] = await Promise.all([
          fetchCommunities({
            collegeId: collegeIdFromState || undefined,
          }),
          fetchCommunityMessages(id, { limit: 50 }),
        ]);
        if (cancelled) return;
        setCommunitiesJoined(communityList.joined || []);
        setCommunitiesOthers(communityList.others || []);
        setCommunity(messageData.community || null);
        setMessages(messageData.messages || []);
        setNextCursor(messageData.nextCursor || null);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load community");
        }
      } finally {
        if (!cancelled) setLoadingMessages(false);
      }
    }
    loadCommunitiesAndMessages();
    return () => {
      cancelled = true;
    };
  }, [id, collegeIdFromState]);

  const isMember = useMemo(() => {
    if (!user || !community) return false;
    return community.memberIds?.includes(user.id);
  }, [user, community]);

  const allCommunities = useMemo(
    () => [...communitiesJoined, ...communitiesOthers],
    [communitiesJoined, communitiesOthers],
  );

  const handleLoadMore = async () => {
    if (!nextCursor || loadingMore) return;
    try {
      setLoadingMore(true);
      const data = await fetchCommunityMessages(id, {
        cursor: nextCursor,
        limit: 50,
      });
      setMessages((prev) => [...prev, ...(data.messages || [])]);
      setNextCursor(data.nextCursor || null);
    } catch (err) {
      setError(err.message || "Failed to load more messages");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleJoin = async () => {
    try {
      const token = await getToken();
      const updated = await joinCommunity(id, token);
      setCommunity(updated);
      setCommunitiesJoined((prev) => {
        if (prev.find((c) => c._id === updated._id)) return prev;
        return [updated, ...prev];
      });
      setCommunitiesOthers((prev) => prev.filter((c) => c._id !== updated._id));
    } catch (err) {
      setError(err.message || "Failed to join community");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!text.trim() && !file) || sending) return;
    try {
      setSending(true);
      let payload;
      const messageText = text.trim();

      if (file) {
        const { uploadCommunityFile } = await import("../api");
        const token = await getToken();
        const { fileUrl } = await uploadCommunityFile(id, file, token);
        payload = {
          contentType: "file",
          fileUrl,
          text: messageText,
          authorDisplayName: user?.fullName || "Anonymous",
        };
      } else {
        payload = {
          contentType: "text",
          text: messageText,
          authorDisplayName: user?.fullName || "Anonymous",
        };
      }

      const token = await getToken();
      const msg = await sendCommunityMessage(id, payload, token);
      setMessages((prev) => [msg, ...prev]);
      setText("");
      setFile(null);
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const handleLike = async (messageId) => {
    try {
      const { likeCommunityMessage } = await import("../api");
      const token = await getToken();
      const updated = await likeCommunityMessage(id, messageId, token);
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m)),
      );
    } catch (err) {
      setError(err.message || "Failed to like message");
    }
  };

  const handleReport = async (messageId) => {
    try {
      const { reportCommunityMessage } = await import("../api");
      const token = await getToken();
      const updated = await reportCommunityMessage(id, messageId, token);
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m)),
      );
    } catch (err) {
      setError(err.message || "Failed to report message");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const { deleteCommunityMessage } = await import("../api");
      const token = await getToken();
      await deleteCommunityMessage(id, messageId, token);
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    } catch (err) {
      setError(err.message || "Failed to delete message");
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const { removeCommunityMember } = await import("../api");
      const token = await getToken();
      const updated = await removeCommunityMember(id, memberId, token);
      setCommunity(updated);
    } catch (err) {
      setError(err.message || "Failed to remove member");
    }
  };

  const isOwner = useMemo(() => {
    if (!user || !community) return false;
    return community.createdBy === user.id;
  }, [user, community]);

  const searchGifs = async () => {
    if (!GIPHY_KEY || !gifQuery.trim()) {
      setError(
        "GIF search is not configured. Add VITE_GIPHY_API_KEY in frontend .env.",
      );
      return;
    }
    try {
      const params = new URLSearchParams({
        api_key: GIPHY_KEY,
        q: gifQuery.trim(),
        limit: "8",
        rating: "pg-13",
      });
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?${params.toString()}`,
      );
      const json = await res.json();
      setGifResults(json.data || []);
    } catch (err) {
      setError("Failed to search GIFs");
    }
  };

  const sendGif = async (gifUrl) => {
    try {
      setSending(true);
      const messageText = text.trim();
      const payload = {
        contentType: "gif",
        gifUrl,
        text: messageText,
        authorDisplayName: user?.fullName || "Anonymous",
      };
      const token = await getToken();
      const msg = await sendCommunityMessage(id, payload, token);
      setMessages((prev) => [msg, ...prev]);
      setShowGifPicker(false);
      setGifResults([]);
      setGifQuery("");
      setText("");
    } catch (err) {
      setError(err.message || "Failed to send GIF");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-black to-black text-black">
      <div className="mx-auto flex max-w-6xl gap-4 px-4 py-6">
        {/* Left sidebar: all communities */}
        <aside className="hidden w-64 flex-shrink-0 rounded-lg bg-white border border-gray-200 p-4 shadow-sm md:block sticky top-0 max-h-screen overflow-y-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wide text-gray-700">
              Communities
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600 font-medium">
              {allCommunities.length}
            </span>
          </div>
          <nav className="space-y-1 text-xs">
            {communitiesJoined.length > 0 && (
              <>
                <p className="px-2 pb-2 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                  Joined
                </p>
                {communitiesJoined.map((c) => (
                  <Link
                    key={c._id}
                    to={`/media/community/${c._id}`}
                    className={`flex items-center justify-between rounded-md px-2 py-2 ${
                      c._id === id
                        ? "bg-amber-100 text-gray-900 border border-amber-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="truncate font-medium">{c.name}</span>
                    {c.memberCount ? (
                      <span className="ml-2 text-[10px] text-gray-500">
                        {c.memberCount}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </>
            )}
            {communitiesOthers.length > 0 && (
              <>
                <p className="px-2 pt-3 pb-2 text-[11px] font-bold uppercase tracking-wide text-gray-600">
                  Discover
                </p>
                {communitiesOthers.map((c) => (
                  <Link
                    key={c._id}
                    to={`/media/community/${c._id}`}
                    className={`flex items-center justify-between rounded-md px-2 py-2 ${
                      c._id === id
                        ? "bg-blue-100 text-gray-900 border border-blue-300"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="truncate font-medium">{c.name}</span>
                    {c.memberCount ? (
                      <span className="ml-2 text-[10px] text-gray-500">
                        {c.memberCount}
                      </span>
                    ) : null}
                  </Link>
                ))}
              </>
            )}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {error && (
            <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {!community && !loadingMessages && (
            <div className="py-10 text-center text-sm text-gray-500">
              Community not found.
            </div>
          )}

          {community && (
            <>
              <header className="mb-6 border-b-2 border-gray-300 pb-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  {community.name}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  {community.description || "No description yet."}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="font-medium">
                    {community.memberCount || 0} members
                  </span>
                  <span className="font-medium">
                    {community.collegeId || "All colleges"}
                  </span>
                  <SignedIn>
                    {!isMember && (
                      <button
                        type="button"
                        onClick={handleJoin}
                        className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
                      >
                        Join community to message
                      </button>
                    )}
                    {isMember && (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 border border-green-300">
                        ✓ Joined – you can message
                      </span>
                    )}
                  </SignedIn>
                  <SignedOut>
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-300">
                      Sign in and join to start messaging
                    </span>
                  </SignedOut>
                </div>
              </header>

              {/* Composer at top */}
              <section className="mb-4 border border-gray-300 bg-white px-4 py-4 rounded-lg shadow-sm">
                <SignedOut>
                  <div className="text-xs text-gray-600">
                    You can read this community without signing in. Sign in and
                    join the community to start messaging, posting GIFs, emojis,
                    and files.
                  </div>
                </SignedOut>
                <SignedIn>
                  {!isMember ? (
                    <div className="text-xs text-gray-600">
                      You&apos;re not a member yet. Join the community above to
                      start messaging.
                    </div>
                  ) : (
                    <form onSubmit={handleSend} className="space-y-2">
                      <textarea
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      />
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <label className="cursor-pointer inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 hover:bg-gray-50 bg-white transition">
                            <svg
                              className="h-4 w-4 text-gray-600"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M13.5 6.75L7.5 12.75C6.67157 13.5784 6.67157 14.9216 7.5 15.75C8.32843 16.5784 9.67157 16.5784 10.5 15.75L17 9.25" />
                              <path d="M16 6L18 4C19.1046 2.89543 20.8954 2.89543 22 4C23.1046 5.10457 23.1046 6.89543 22 8L12.5 17.5C10.8431 19.1569 8.15686 19.1569 6.5 17.5C4.84315 15.8431 4.84315 13.1569 6.5 11.5L12 6" />
                            </svg>
                            <span>Attach</span>
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                              }
                            />
                          </label>
                          {file && (
                            <span className="truncate max-w-[160px] text-gray-500">
                              {file.name}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowGifPicker(true)}
                            className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 bg-white hover:bg-gray-50 transition"
                          >
                            <svg
                              className="h-4 w-4 text-fuchsia-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect x="3" y="4" width="18" height="16" rx="2" />
                              <path d="M7 15V9L10 15L13 9V15" />
                              <path d="M15 9H18" />
                            </svg>
                            <span>GIF</span>
                          </button>
                        </div>
                        <button
                          type="submit"
                          disabled={(!text.trim() && !file) || sending}
                          className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 transition"
                        >
                          {sending ? "Sending…" : "Send"}
                        </button>
                      </div>
                    </form>
                  )}
                </SignedIn>
              </section>

              {/* Messages list */}
              <section className="flex flex-col gap-3">
                {loadingMessages && messages.length === 0 && (
                  <div className="py-8 text-center text-sm text-gray-500">
                    Loading messages…
                  </div>
                )}

                {!loadingMessages && messages.length === 0 && (
                  <div className="py-8 text-center text-sm text-gray-500">
                    No messages yet. Be the first to say hi once you&apos;re a
                    member.
                  </div>
                )}

                {messages.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {messages.map((m) => {
                      const canDelete =
                        user && (m.authorId === user.id || isOwner);
                      return (
                        <li
                          key={m._id}
                          className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm hover:border-gray-300 transition"
                        >
                          <div className="mb-2 flex items-center justify-between text-xs text-gray-600">
                            <span className="font-semibold text-gray-800">
                              {m.authorDisplayName || "Anonymous"}
                            </span>
                            <span>
                              {new Date(m.createdAt).toLocaleString(undefined, {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "short",
                              })}
                            </span>
                          </div>
                          {m.contentType === "text" && (
                            <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                              {m.text}
                            </p>
                          )}
                          {m.contentType === "emoji" && (
                            <div className="text-3xl">{m.emoji}</div>
                          )}
                          {m.contentType === "gif" && m.gifUrl && (
                            <div className="space-y-2">
                              {m.text ? (
                                <p className="whitespace-pre-wrap text-gray-800">
                                  {m.text}
                                </p>
                              ) : null}
                              <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 border border-purple-200">
                                GIF
                              </span>
                              <img
                                src={m.gifUrl}
                                alt="GIF"
                                className="max-h-64 rounded-lg object-contain border border-gray-200"
                              />
                            </div>
                          )}
                          {m.contentType === "file" && m.fileUrl && (
                            <div className="space-y-2">
                              {m.text ? (
                                <p className="whitespace-pre-wrap text-gray-800">
                                  {m.text}
                                </p>
                              ) : null}
                              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-200">
                                📎 File
                              </span>
                              <a
                                href={m.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium hover:underline"
                              >
                                Download file
                              </a>
                            </div>
                          )}
                          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => handleLike(m._id)}
                                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-blue-600 font-medium transition"
                              >
                                <span>👍</span>
                                <span>{m.likesCount || 0}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleReport(m._id)}
                                className="inline-flex items-center gap-1.5 text-gray-500 hover:text-red-600 font-medium transition"
                              >
                                <span>🚩</span>
                                <span>Report</span>
                                {m.reportsCount ? (
                                  <span>({m.reportsCount})</span>
                                ) : null}
                              </button>
                            </div>
                            {canDelete && (
                              <button
                                type="button"
                                onClick={() => handleDeleteMessage(m._id)}
                                className="text-red-600 hover:text-red-700 font-medium hover:underline transition"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {nextCursor && (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="mt-4 self-center rounded-full border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60 transition"
                  >
                    {loadingMore ? "Loading…" : "Load older messages"}
                  </button>
                )}
              </section>
            </>
          )}
        </main>
      </div>

      {showGifPicker && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                value={gifQuery}
                onChange={(e) => setGifQuery(e.target.value)}
                placeholder="Search GIFs…"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={searchGifs}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowGifPicker(false);
                  setGifResults([]);
                  setGifQuery("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
            <div className="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto">
              {gifResults.map((g) => {
                const url =
                  g.images?.fixed_height_small?.url || g.images?.downsized?.url;
                if (!url) return null;
                return (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => sendGif(url)}
                    className="overflow-hidden rounded-lg border border-gray-300 hover:border-blue-500 transition"
                  >
                    <img
                      src={url}
                      alt={g.title || "GIF"}
                      className="h-20 w-full object-cover hover:opacity-80"
                    />
                  </button>
                );
              })}
              {gifResults.length === 0 && (
                <div className="col-span-4 py-4 text-center text-xs text-gray-500">
                  Search for a keyword to see GIFs from Giphy.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
