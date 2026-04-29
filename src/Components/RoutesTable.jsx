import { Link } from "react-router-dom";

export default function RoutesTable({ routes }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">Sample Routes</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Train Timings Added By Admin</h2>
          </div>
          <Link to="/tracking" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            Track Existing Freight
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-4 bg-slate-100 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <p>From</p>
            <p>To</p>
            <p>Departure</p>
            <p>Frequency</p>
          </div>

          {routes.map((route) => (
            <div key={`${route.from}-${route.to}`} className="grid grid-cols-4 items-center border-t border-slate-100 px-6 py-4 text-sm">
              <p className="font-semibold text-slate-900">{route.from}</p>
              <p className="font-semibold text-slate-900">{route.to}</p>
              <p className="text-slate-700">{route.time}</p>
              <span className="inline-flex w-fit rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                {route.frequency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
