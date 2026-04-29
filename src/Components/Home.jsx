import { Link } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RoutesTable from "./RoutesTable";
import ServicesGrid from "./ServicesGrid";
import { navLinks, routes, services, stats } from "../data/siteData";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar links={navLinks} />

      <section className="relative overflow-hidden px-6 py-20 text-white">
        <div className="absolute -left-20 top-8 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
              React + Node + Express + MongoDB
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Freight Management System For Admin And User Operations
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300">
              This system allows admins to add train timings and destinations, while users can book freight, check live tracking, view order status, and review booking history.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register" className="rounded-md bg-amber-500 px-6 py-3 font-semibold text-slate-950">
                Create User Account
              </Link>
              <Link to="/login" className="rounded-md border border-slate-600 px-6 py-3 font-semibold text-slate-100">
                Login To System
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">Admin Role</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">Add train schedule, manage destinations, review all bookings, and update freight status.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">User Role</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">Book freight by route, track shipments using tracking ID, and access order history anytime.</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">System Highlights</p>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                  <p className="text-3xl font-black text-white">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 text-sm text-amber-100">
              Demo admin: <span className="font-semibold">admin@freight.com / admin123</span>
              <br />
              Demo user: <span className="font-semibold">user@freight.com / user123</span>
            </div>
          </div>
        </div>
      </section>

      <ServicesGrid services={services} />
      <RoutesTable routes={routes} />

      <section className="bg-slate-900 px-6 pb-16">
        <div className="mx-auto max-w-6xl rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Project Flow</p>
          <h2 className="mt-3 text-3xl font-black">Simple explanation for viva</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-lg font-semibold">1. Authentication</p>
              <p className="mt-2 text-sm text-slate-300">User logs in and the system checks role using JWT authentication.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-lg font-semibold">2. Role Based Access</p>
              <p className="mt-2 text-sm text-slate-300">Admin sees train and booking management. User sees booking and tracking features.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
              <p className="text-lg font-semibold">3. MongoDB Storage</p>
              <p className="mt-2 text-sm text-slate-300">Users, trains, and bookings are stored in MongoDB using Mongoose models.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
