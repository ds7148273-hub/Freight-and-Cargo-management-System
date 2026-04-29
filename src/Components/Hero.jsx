import { Link } from "react-router-dom";

export default function Hero({ stats }) {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-amber-400/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-amber-200">
            Freight Intelligence For India
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Move Cargo With
            <span className="bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
              {" "}
              Speed, Clarity, Control
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-slate-300">
            Digitize booking, tracking, and operations across rail corridors with
            one unified platform for teams, shippers, and enterprise partners.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-md bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-amber-400">
              Book Shipment
            </button>
            <Link
              to="/tracking"
              className="rounded-md border border-slate-600 px-6 py-3 font-semibold text-slate-100 transition hover:border-slate-400"
            >
              Track Shipment
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700/70 bg-slate-900/75 p-6 shadow-2xl shadow-slate-950/40">
          <p className="text-xs font-semibold uppercase tracking-widest text-cyan-200">
            Network Snapshot
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700 bg-slate-950/70 p-4"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-xs text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
