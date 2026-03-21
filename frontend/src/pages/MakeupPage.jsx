import React, { useEffect, useMemo, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  createFeatureSuggestion,
  fetchFeatureSuggestions,
  voteFeatureSuggestion,
} from "../api";

const initialForm = {
  name: "",
  featureTitle: "",
  details: "",
};

function formatCreatedAt(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MakeupPage() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [form, setForm] = useState({
    ...initialForm,
    name: user?.fullName || user?.username || "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [votingId, setVotingId] = useState("");
  const [error, setError] = useState("");

  const sortedSuggestions = useMemo(
    () =>
      [...suggestions].sort(
        (a, b) =>
          (b.votesCount || 0) - (a.votesCount || 0) ||
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [suggestions],
  );

  useEffect(() => {
    let cancelled = false;

    async function loadSuggestions() {
      try {
        setLoading(true);
        const data = await fetchFeatureSuggestions();
        if (!cancelled) {
          setSuggestions(data.suggestions || []);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "Failed to load suggestions.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadSuggestions();

    return () => {
      cancelled = true;
    };
  }, []);

  const onChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.featureTitle.trim() || !form.details.trim()) {
      setError("Please fill title and description.");
      return;
    }

    try {
      setSubmitting(true);
      const token = await getToken();
      const response = await createFeatureSuggestion(
        {
          name: form.name,
          featureTitle: form.featureTitle,
          details: form.details,
        },
        token,
      );

      if (response?.suggestion) {
        setSuggestions((prev) => [response.suggestion, ...prev]);
      }

      setForm((prev) => ({
        ...initialForm,
        name: prev.name,
      }));
    } catch (submitError) {
      setError(submitError.message || "Failed to post suggestion.");
    } finally {
      setSubmitting(false);
    }
  };

  const onVote = async (suggestionId) => {
    try {
      setVotingId(suggestionId);
      setError("");
      const token = await getToken();
      const response = await voteFeatureSuggestion(suggestionId, token);
      const updated = response?.suggestion;
      if (updated) {
        setSuggestions((prev) =>
          prev.map((entry) => (entry._id === updated._id ? updated : entry)),
        );
      }
    } catch (voteError) {
      setError(voteError.message || "Failed to vote.");
    } finally {
      setVotingId("");
    }
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-slate-100 via-white to-emerald-50 px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-5">
        {/* <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"> */}
        <p className="mb-2 inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-700">
          Suggest new features
        </p>
        {/* </section> */}

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="text"
                value={form.name}
                onChange={onChange("name")}
                placeholder="Your name (optional)"
                className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                maxLength={80}
              />
              <input
                type="text"
                value={form.featureTitle}
                onChange={onChange("featureTitle")}
                placeholder="Feature title"
                className="sm:col-span-2 rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
                maxLength={120}
                required
              />
            </div>
            <textarea
              rows={4}
              value={form.details}
              onChange={onChange("details")}
              placeholder="Describe your feature idea"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
              maxLength={1500}
              required
            />
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Most upvoted ideas appear first.
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center rounded-full bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-cyan-300"
              >
                {submitting ? "Posting..." : "Post Idea"}
              </button>
            </div>
          </form>
        </section>

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="space-y-3">
          {loading && (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
              Loading suggestions...
            </div>
          )}

          {!loading && sortedSuggestions.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-500">
              No feature posts yet. Be the first to suggest one.
            </div>
          )}

          {sortedSuggestions.map((suggestion) => (
            <article
              key={suggestion._id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {suggestion.featureTitle}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Posted by {suggestion.name || "Anonymous"} •{" "}
                    {formatCreatedAt(suggestion.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onVote(suggestion._id)}
                  disabled={votingId === suggestion._id}
                  className="inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
                >
                  {votingId === suggestion._id
                    ? "Voting..."
                    : `▲ Vote (${suggestion.votesCount || 0})`}
                </button>
              </div>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                {suggestion.details}
              </p>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
