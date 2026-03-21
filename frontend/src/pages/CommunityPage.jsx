import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import {
  fetchCommunities,
  fetchCommunityMessages,
  joinCommunity,
  sendCommunityMessage,
} from "../api";

function formatMessageTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  });
}

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

  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [joinDisplayName, setJoinDisplayName] = useState("");
  const [joining, setJoining] = useState(false);

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
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "Failed to load community");
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

  useEffect(() => {
    if (!user) return;
    setJoinDisplayName(user.fullName || user.username || "Anonymous");
  }, [user]);

  const isMember = useMemo(() => {
    if (!user || !community) return false;
    return community.memberIds?.includes(user.id);
  }, [user, community]);

  const isOwner = useMemo(() => {
    if (!user || !community) return false;
    return community.createdBy === user.id;
  }, [user, community]);

  const memberDisplayName = useMemo(() => {
    if (!user || !community?.memberProfiles?.length) return "";
    const profile = community.memberProfiles.find(
      (entry) => entry.userId === user.id,
    );
    return profile?.displayName || "";
  }, [user, community]);

  const allCommunities = useMemo(
    () => [...communitiesJoined, ...communitiesOthers],
    [communitiesJoined, communitiesOthers],
  );

  const topCurators = useMemo(() => {
    const counts = new Map();
    for (const message of messages) {
      const name = message.authorDisplayName || "Anonymous";
      counts.set(name, (counts.get(name) || 0) + 1);
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }, [messages]);

  const openJoinDialog = () => {
    setJoinDisplayName(
      memberDisplayName || user?.fullName || user?.username || "Anonymous",
    );
    setShowJoinDialog(true);
  };

  const handleJoinWithName = async () => {
    try {
      setJoining(true);
      setError(null);
      const token = await getToken();
      const updated = await joinCommunity(id, token, {
        displayName: joinDisplayName,
      });

      setCommunity(updated);
      setCommunitiesJoined((prev) => {
        if (prev.find((entry) => entry._id === updated._id)) {
          return prev.map((entry) =>
            entry._id === updated._id ? updated : entry,
          );
        }
        return [updated, ...prev];
      });
      setCommunitiesOthers((prev) =>
        prev.filter((entry) => entry._id !== updated._id),
      );
      setShowJoinDialog(false);
    } catch (joinError) {
      setError(joinError.message || "Failed to join community");
    } finally {
      setJoining(false);
    }
  };

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
    } catch (loadMoreError) {
      setError(loadMoreError.message || "Failed to load more messages");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if ((!text.trim() && !file) || sending) return;

    try {
      setSending(true);
      let payload;
      const messageText = text.trim();
      const currentName =
        memberDisplayName || user?.fullName || user?.username || "Anonymous";

      if (file) {
        const { uploadCommunityFile } = await import("../api");
        const token = await getToken();
        const { fileUrl } = await uploadCommunityFile(id, file, token);
        payload = {
          contentType: "file",
          fileUrl,
          text: messageText,
          authorDisplayName: currentName,
        };
      } else {
        payload = {
          contentType: "text",
          text: messageText,
          authorDisplayName: currentName,
        };
      }

      const token = await getToken();
      const msg = await sendCommunityMessage(id, payload, token);
      setMessages((prev) => [msg, ...prev]);
      setText("");
      setFile(null);
    } catch (sendError) {
      setError(sendError.message || "Failed to send message");
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
        prev.map((entry) => (entry._id === updated._id ? updated : entry)),
      );
    } catch (likeError) {
      setError(likeError.message || "Failed to like message");
    }
  };

  const handleReport = async (messageId) => {
    try {
      const { reportCommunityMessage } = await import("../api");
      const token = await getToken();
      const updated = await reportCommunityMessage(id, messageId, token);
      setMessages((prev) =>
        prev.map((entry) => (entry._id === updated._id ? updated : entry)),
      );
    } catch (reportError) {
      setError(reportError.message || "Failed to report message");
    }
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      const { deleteCommunityMessage } = await import("../api");
      const token = await getToken();
      await deleteCommunityMessage(id, messageId, token);
      setMessages((prev) => prev.filter((entry) => entry._id !== messageId));
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete message");
    }
  };

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
    } catch {
      setError("Failed to search GIFs");
    }
  };

  const sendGif = async (gifUrl) => {
    try {
      setSending(true);
      const currentName =
        memberDisplayName || user?.fullName || user?.username || "Anonymous";
      const payload = {
        contentType: "gif",
        gifUrl,
        text: text.trim(),
        authorDisplayName: currentName,
      };
      const token = await getToken();
      const msg = await sendCommunityMessage(id, payload, token);
      setMessages((prev) => [msg, ...prev]);
      setShowGifPicker(false);
      setGifResults([]);
      setGifQuery("");
      setText("");
    } catch (sendError) {
      setError(sendError.message || "Failed to send GIF");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-100 via-slate-50 to-white text-slate-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 py-6 md:grid-cols-[230px_minmax(0,1fr)_250px]">
        <aside className="hidden md:sticky md:top-6 md:flex md:h-[calc(100vh-7rem)] md:flex-col md:rounded-3xl md:border md:border-slate-200 md:bg-slate-50 md:p-4 md:shadow-sm">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Your Communities
          </p>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1">
            {allCommunities.map((entry) => {
              const selected = entry._id === id;
              const joined = communitiesJoined.some((j) => j._id === entry._id);
              return (
                <Link
                  key={entry._id}
                  to={`/media/community/${entry._id}`}
                  className={`flex items-center justify-between rounded-2xl px-3 py-2.5 text-sm transition ${
                    selected
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-700 hover:bg-white"
                  }`}
                >
                  <span className="truncate font-medium">{entry.name}</span>
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      selected
                        ? "bg-white/20 text-white"
                        : joined
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {joined ? "Joined" : "New"}
                  </span>
                </Link>
              );
            })}
          </nav>
          <Link
            to="/media"
            className="mt-auto inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-300"
          >
            Join New Community
          </Link>
        </aside>

        <main>
          {error && (
            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {!community && !loadingMessages && (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-8 text-center text-sm text-slate-500">
              Community not found.
            </div>
          )}

          {community && (
            <>
              <section className="mb-4 rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                      {community.name}
                    </h1>
                    <p className="mt-2 max-w-2xl text-base text-slate-600">
                      {community.description ||
                        "A space for sharing and discussing ideas in this community."}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="font-semibold">
                        {community.memberCount || 0} members
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-400" />
                      <span>{community.collegeId || "All colleges"}</span>
                      {isMember && memberDisplayName && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-slate-400" />
                          <span className="font-medium text-blue-700">
                            Posting as {memberDisplayName}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <SignedIn>
                      {!isMember ? (
                        <button
                          type="button"
                          onClick={openJoinDialog}
                          className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Join Community
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={openJoinDialog}
                          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Edit Group Name
                        </button>
                      )}
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Sign in to Join
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </section>

              <section className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <SignedOut>
                  <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                    You can read this group without signing in. Join the
                    community to post text, GIFs, and files.
                  </div>
                </SignedOut>

                <SignedIn>
                  {!isMember ? (
                    <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                      Join the community first. You can keep your current name
                      or change it for this group only.
                    </div>
                  ) : (
                    <form onSubmit={handleSend} className="space-y-3">
                      <textarea
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share a thought with the community"
                        className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs">
                          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50">
                            Choose File
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                              }
                            />
                          </label>
                          {file && (
                            <span className="max-w-[180px] truncate text-slate-500">
                              {file.name}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => setShowGifPicker(true)}
                            className="inline-flex items-center rounded-full border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50"
                          >
                            GIF
                          </button>
                        </div>
                        <button
                          type="submit"
                          disabled={(!text.trim() && !file) || sending}
                          className="inline-flex items-center rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                        >
                          {sending ? "Posting..." : "Post"}
                        </button>
                      </div>
                    </form>
                  )}
                </SignedIn>
              </section>

              <section className="space-y-4">
                {loadingMessages && messages.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
                    Loading messages...
                  </div>
                )}

                {!loadingMessages && messages.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
                    No messages yet. Be the first one to post.
                  </div>
                )}

                {messages.map((message) => {
                  const canDelete =
                    user && (message.authorId === user.id || isOwner);
                  return (
                    <article
                      key={message._id}
                      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">
                            {message.authorDisplayName || "Anonymous"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {formatMessageTime(message.createdAt)}
                          </p>
                        </div>
                      </div>

                      {message.contentType === "text" && (
                        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                          {message.text}
                        </p>
                      )}

                      {message.contentType === "emoji" && (
                        <div className="text-3xl">{message.emoji}</div>
                      )}

                      {message.contentType === "gif" && message.gifUrl && (
                        <div className="space-y-3">
                          {message.text ? (
                            <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                              {message.text}
                            </p>
                          ) : null}
                          <img
                            src={message.gifUrl}
                            alt="GIF"
                            className="max-h-[440px] w-full rounded-2xl object-cover"
                          />
                        </div>
                      )}

                      {message.contentType === "file" && message.fileUrl && (
                        <div className="space-y-2">
                          {message.text ? (
                            <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                              {message.text}
                            </p>
                          ) : null}
                          <a
                            href={message.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                          >
                            Open Attachment
                          </a>
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4 text-slate-600">
                          <button
                            type="button"
                            onClick={() => handleLike(message._id)}
                            className="font-semibold hover:text-blue-600"
                          >
                            Like ({message.likesCount || 0})
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReport(message._id)}
                            className="font-semibold hover:text-red-600"
                          >
                            Report
                            {message.reportsCount
                              ? ` (${message.reportsCount})`
                              : ""}
                          </button>
                        </div>

                        {canDelete && (
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(message._id)}
                            className="font-semibold text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}

                {nextCursor && (
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      {loadingMore ? "Loading..." : "Load older messages"}
                    </button>
                  </div>
                )}
              </section>
            </>
          )}
        </main>

        <aside className="hidden space-y-4 md:block">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <p className="mb-2 text-sm font-semibold text-slate-900">
              Top Curators
            </p>
            <div className="space-y-2 text-sm text-slate-700">
              {topCurators.length === 0 && (
                <p className="text-xs text-slate-500">
                  Curator stats will appear once people post.
                </p>
              )}
              {topCurators.map((curator) => (
                <div
                  key={curator.name}
                  className="flex items-center justify-between rounded-2xl bg-white px-3 py-2"
                >
                  <span className="font-medium">{curator.name}</span>
                  <span className="text-xs text-slate-500">
                    {curator.count} posts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {showJoinDialog && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
            <h2 className="text-xl font-semibold text-slate-900">
              Join with your group name
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Keep your current name or set a different name for this community
              only.
            </p>

            <label className="mt-4 block text-sm font-medium text-slate-700">
              Name in this group
              <input
                type="text"
                value={joinDisplayName}
                onChange={(e) => setJoinDisplayName(e.target.value)}
                maxLength={40}
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                placeholder="Your display name"
              />
            </label>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowJoinDialog(false)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleJoinWithName}
                disabled={joining}
                className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
              >
                {joining
                  ? "Saving..."
                  : isMember
                    ? "Save Name"
                    : "Join Community"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showGifPicker && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-center gap-2">
              <input
                type="text"
                value={gifQuery}
                onChange={(e) => setGifQuery(e.target.value)}
                placeholder="Search GIFs"
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={searchGifs}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
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
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
            <div className="grid max-h-64 grid-cols-4 gap-2 overflow-y-auto">
              {gifResults.map((gif) => {
                const url =
                  gif.images?.fixed_height_small?.url ||
                  gif.images?.downsized?.url;
                if (!url) return null;
                return (
                  <button
                    type="button"
                    key={gif.id}
                    onClick={() => sendGif(url)}
                    className="overflow-hidden rounded-xl border border-slate-200 hover:border-blue-400"
                  >
                    <img
                      src={url}
                      alt={gif.title || "GIF"}
                      className="h-20 w-full object-cover"
                    />
                  </button>
                );
              })}
              {gifResults.length === 0 && (
                <div className="col-span-4 py-4 text-center text-xs text-slate-500">
                  Search for a keyword to load GIFs from Giphy.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
