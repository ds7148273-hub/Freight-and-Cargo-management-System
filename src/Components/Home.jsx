import { useState } from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import Navbar from "./Navbar";
import RoutesTable from "./RoutesTable";
import ServicesGrid from "./ServicesGrid";
import TrackingPanel from "./TrackingPanel";
import {
  navLinks,
  routes,
  services,
  stats,
  trackingRecords,
} from "../data/siteData";

export default function Home() {
  const [bookedRoute, setBookedRoute] = useState("");

  const handleQuickBook = (route) => {
    setBookedRoute(
      `Booking request started for ${route.from} to ${route.to} (${route.time} transit)`
    );
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar links={navLinks} />
      <Hero stats={stats} />
      <TrackingPanel records={trackingRecords} />
      <ServicesGrid services={services} />
      <RoutesTable routes={routes} onQuickBook={handleQuickBook} />

      <section className="bg-slate-900 px-6 pb-16">
        <div className="mx-auto w-full max-w-6xl rounded-2xl border border-amber-300/30 bg-gradient-to-r from-amber-400/20 to-cyan-400/20 p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-200">
            Enterprise Support
          </p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Need a Custom Freight Plan?
          </h2>
          <p className="mt-3 max-w-2xl text-slate-100">
            Dedicated wagons, volume-based SLAs, and route optimization support for
            manufacturing and logistics teams.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-md bg-white px-5 py-3 font-semibold text-slate-950">
              Request Quote
            </button>
            <button className="rounded-md border border-white/60 px-5 py-3 font-semibold text-white">
              Download Brochure
            </button>
          </div>
          {bookedRoute && (
            <p className="mt-5 rounded-md border border-emerald-400/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100">
              {bookedRoute}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
x