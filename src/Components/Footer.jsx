export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold text-white">Rail Freight</h3>
          <p className="mt-3 text-sm text-slate-300">
            Freight orchestration platform for modern rail-based logistics.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Services</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Full Trainload</li>
            <li>Containerized Cargo</li>
            <li>Parcel & Express</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Company</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>About Us</li>
            <li>Newsroom</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white">Support</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Track Shipment</li>
            <li>Help Center</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-slate-800 px-6 pt-6 text-xs text-slate-500">
        © 2026 Rail Freight. All rights reserved.
      </div>
    </footer>
  );
}
