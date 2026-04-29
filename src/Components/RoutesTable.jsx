export default function RoutesTable({ routes, onQuickBook }) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
              Popular Corridors
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Key Freight Routes
            </h2>
          </div>
          <button className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
            View All Routes
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="grid grid-cols-5 bg-slate-100 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <p>From</p>
            <p>To</p>
            <p>Transit Time</p>
            <p>Frequency</p>
            <p>Action</p>
          </div>

          {routes.map((route) => (
            <div
              key={`${route.from}-${route.to}`}
              className="grid grid-cols-5 items-center border-t border-slate-100 px-6 py-4 text-sm"
            >
              <p className="font-semibold text-slate-900">{route.from}</p>
              <p className="font-semibold text-slate-900">{route.to}</p>
              <p className="text-slate-700">{route.time}</p>
              <span className="inline-flex w-fit rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                {route.frequency}
              </span>
              <button
                onClick={() => onQuickBook(route)}
                className="w-fit rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Quick Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
