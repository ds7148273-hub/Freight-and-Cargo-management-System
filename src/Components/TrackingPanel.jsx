import { useMemo, useState } from "react";

export default function TrackingPanel({ records }) {
  const [trackingId, setTrackingId] = useState("WG47219");
  const [cargoType, setCargoType] = useState("Wagon");
  const [result, setResult] = useState(records.WG47219);

  const normalized = useMemo(() => trackingId.trim().toUpperCase(), [trackingId]);

  const trackShipment = () => {
    if (!normalized) {
      setResult({ status: "Missing", location: "Please enter an ID", eta: "-" });
      return;
    }

    const found = records[normalized];
    if (found) {
      setResult(found);
      return;
    }

    setResult({
      status: "Not Found",
      location: `No ${cargoType.toLowerCase()} found for ${normalized}`,
      eta: "Check ID and try again",
    });
  };

  return (
    <section className="bg-slate-900 py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-950/80 p-6 lg:grid-cols-[1.3fr_0.5fr_0.6fr] lg:items-end">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-100">
              Track Shipment
            </label>
            <input
              type="text"
              value={trackingId}
              onChange={(event) => setTrackingId(event.target.value)}
              placeholder="Enter Consignment ID (e.g., WG47219)"
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-amber-400 transition focus:ring-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-100">Type</label>
            <select
              value={cargoType}
              onChange={(event) => setCargoType(event.target.value)}
              className="w-full rounded-md border border-slate-600 bg-slate-900 px-4 py-3 text-sm text-white outline-none ring-amber-400 transition focus:ring-2"
            >
              <option>Wagon</option>
              <option>Container</option>
              <option>Parcel</option>
            </select>
          </div>

          <button
            onClick={trackShipment}
            className="rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Track Now
          </button>
        </div>

        <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-4">
          <p className="text-sm text-cyan-100">Status: {result.status}</p>
          <p className="mt-1 text-sm text-slate-200">Current Location: {result.location}</p>
          <p className="mt-1 text-sm text-slate-200">ETA: {result.eta}</p>
        </div>
      </div>
    </section>
  );
}
