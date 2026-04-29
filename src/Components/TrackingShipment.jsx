import { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { navLinks } from "../data/siteData";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

export default function TrackingShipment() {
  const [trackingId, setTrackingId] = useState("TRK100001");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTrack = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_BASE_URL}/bookings/track/${trackingId.trim().toUpperCase()}`, {
        withCredentials: true,
      });
      setResult(response.data);
    } catch (trackError) {
      setResult(null);
      setError(trackError.response?.data?.message || trackError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar links={navLinks} />

      <section className="px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Live Tracking</p>
          <h1 className="mt-3 text-4xl font-black">Track your freight using tracking ID</h1>
          <p className="mt-4 max-w-2xl text-slate-300">This page is public, so users can quickly check current shipment status, train route, and latest location.</p>

          <form className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]" onSubmit={handleTrack}>
            <input
              value={trackingId}
              onChange={(event) => setTrackingId(event.target.value)}
              placeholder="Enter tracking ID"
              className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
            />
            <button className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950">
              {loading ? "Tracking..." : "Track Freight"}
            </button>
          </form>

          {error && <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</p>}

          {result ? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <article className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Tracking ID</p>
                    <h2 className="mt-2 text-3xl font-black">{result.trackingId}</h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                    {result.status}
                  </span>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Customer: {result.user?.name}</div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Train: {result.train?.trainNumber} - {result.train?.trainName}</div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Route: {result.train?.source} to {result.train?.destination}</div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Live location: {result.liveLocation}</div>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Timeline</p>
                <div className="mt-4 space-y-3">
                  {result.trackingEvents.map((eventItem, index) => (
                    <div key={`${result._id}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                      <span className="font-semibold text-white">{eventItem.label}</span>
                      <span className="block mt-1">Location: {eventItem.location}</span>
                      <span className="block">Time: {eventItem.time}</span>
                      {eventItem.note ? <span className="block text-slate-400">{eventItem.note}</span> : null}
                    </div>
                  ))}
                </div>
              </article>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-6 text-sm text-slate-300">
              Try the seeded tracking ID: <span className="font-semibold text-white">TRK100001</span>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
