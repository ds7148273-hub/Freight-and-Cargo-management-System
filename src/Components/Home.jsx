import { useState } from "react";

const NAV_LINKS = ["Services", "Network", "Track Shipment", "About", "Contact"];

const SERVICES = [
  {
    title: "Full Trainload",
    desc: "Dedicated wagons for bulk commodity transport across India's rail network.",
    icon: "🚂",
  },
  {
    title: "Containerized Cargo",
    desc: "ISO-standard containers for safe and damage-free goods movement.",
    icon: "📦",
  },
  {
    title: "Parcel & Express",
    desc: "Time-critical parcel delivery with express turnarounds.",
    icon: "⚡",
  },
  {
    title: "Warehousing",
    desc: "Rail-side warehousing with inventory management and cold-chain support.",
    icon: "🏭",
  },
  {
    title: "Live Tracking",
    desc: "Real-time wagon monitoring with ETA alerts and status dashboards.",
    icon: "📍",
  },
  {
    title: "Last-Mile Delivery",
    desc: "Rail-to-road integration for complete door-to-door cargo solutions.",
    icon: "🚛",
  },
];

const STATS = [
  { value: "68,000+", label: "Route KMs" },
  { value: "1.4B", label: "Tonnes/Year" },
  { value: "7,349", label: "Stations" },
  { value: "28", label: "States Covered" },
];

const ROUTES = [
  { from: "Mumbai", to: "Delhi", time: "14h", freq: "Daily" },
  { from: "Chennai", to: "Kolkata", time: "22h", freq: "Daily" },
  { from: "Bangalore", to: "Hyderabad", time: "8h", freq: "Twice Daily" },
  { from: "Ahmedabad", to: "Pune", time: "10h", freq: "Daily" },
];

export default function Home() {
  const [trackingId, setTrackingId] = useState("");

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white w-9 h-9 flex items-center justify-center rounded font-bold text-lg">
              RF
            </div>
            <div>
              <div className="font-bold text-gray-900 text-base leading-tight">
                Rail Freight
              </div>
              <div className="text-xs text-red-600 leading-tight">
                Indian Railways
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-gray-600 hover:text-red-600 font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Log In
            </a>
            <a
              href="#"
              className="bg-red-600 text-white text-sm px-4 py-2 rounded hover:bg-red-700 font-medium"
            >
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              India's First Digital Rail Freight Platform
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-5xl font-extrabold leading-tight">
              Move India's Cargo <br />
              <span className="text-red-500">Smarter & Faster</span>
            </h1>

            {/* Subtext */}
            <p className="mt-4 text-gray-400 text-lg leading-relaxed">
              A freight and cargo management platform built on Indian Railways'
              68,000 km network — digitizing bulk transport, parcels, and
              last-mile delivery.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded"
              >
                Book a Shipment
              </a>
              <a
                href="#"
                className="border border-gray-600 hover:border-gray-400 text-white font-semibold px-6 py-3 rounded"
              >
                Track Cargo
              </a>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-red-600 pl-4">
                <div className="text-3xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK SHIPMENT BAR ── */}
      <section className="bg-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1">
              <label className="block text-white text-m font-semibold mb-2">
                Track Your Shipment
              </label>
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter Consignment or Wagon Number..."
                className="w-full px-4 py-3 rounded text-white text-sm outline-none border-black border"
              />
            </div>

            <div>
              <label className="block text-white text-m font-semibold mb-2">
                Type
              </label>
              <select className="px-4 py-3 rounded text-gray-900 text-sm outline-none">
                <option>Wagon</option>
                <option>Container</option>
                <option>Parcel</option>
              </select>
            </div>

            <button className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded">
              Track Now →
            </button>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-red-600 font-semibold text-sm uppercase tracking-wide">
              What We Offer
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              End-to-End Freight Services
            </h2>
            <p className="mt-2 text-gray-500 max-w-lg">
              Everything you need to move goods across India — from booking to
              real-time tracking and last-mile delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-red-200"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {service.title}
                </h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
                <a
                  href="#"
                  className="mt-4 inline-block text-red-600 text-sm font-semibold hover:underline"
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY ROUTES ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-red-600 font-semibold text-sm uppercase tracking-wide">
                Popular Corridors
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                Key Freight Routes
              </h2>
            </div>
            <a
              href="#"
              className="text-red-600 text-sm font-semibold hover:underline"
            >
              View All Routes →
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">
              <div>From</div>
              <div>To</div>
              <div>Transit Time</div>
              <div>Frequency</div>
              <div></div>
            </div>

            {/* Table Rows */}
            {ROUTES.map((route) => (
              <div
                key={route.from + route.to}
                className="grid grid-cols-5 items-center px-6 py-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
              >
                <div className="font-semibold text-gray-900">{route.from}</div>
                <div className="font-semibold text-gray-900">{route.to}</div>
                <div className="text-gray-600">{route.time}</div>
                <div>
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    {route.freq}
                  </span>
                </div>
                <div>
                  <a
                    href="#"
                    className="text-red-600 text-sm font-semibold hover:underline"
                  >
                    Book →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-red-500 font-semibold text-sm uppercase tracking-wide">
              Enterprise & Bulk Clients
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Need a Custom Freight Solution?
            </h2>
            <p className="mt-3 text-gray-400 leading-relaxed">
              Dedicated wagons, SLA guarantees, and priority freight lanes —
              built for manufacturers, miners, and large logistics businesses.
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-fit">
            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded text-center"
            >
              Request Enterprise Quote
            </a>
            <a
              href="#"
              className="border border-gray-600 hover:border-gray-400 text-white font-semibold px-6 py-3 rounded text-center"
            >
              Download Brochure
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded font-bold text-sm">
                  RF
                </div>
                <div className="text-white font-bold text-sm">Rail Freight</div>
              </div>
              <p className="text-sm leading-relaxed">
                India's premier freight and cargo management platform on Indian
                Railways.
              </p>
            </div>

            {/* Footer Link Columns */}
            {[
              {
                title: "Services",
                links: [
                  "Full Trainload",
                  "Containerized Cargo",
                  "Parcel & Express",
                  "Warehousing",
                ],
              },
              {
                title: "Company",
                links: ["About Us", "Newsroom", "Careers", "Partners"],
              },
              {
                title: "Support",
                links: [
                  "Track Shipment",
                  "Help Center",
                  "API Docs",
                  "Contact Us",
                ],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-white text-sm font-semibold mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">
              © 2024 Rail Freight — Ministry of Railways, Government of India.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-xs hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
