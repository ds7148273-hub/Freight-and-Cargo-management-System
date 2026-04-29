export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">Freight Management System</h3>
          <p className="mt-3 text-sm text-slate-300">Simple MERN project with two roles: admin and user.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Admin Features</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Add trains</li>
            <li>Manage routes</li>
            <li>Update booking status</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">User Features</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Book freight</li>
            <li>Live tracking</li>
            <li>Booking history</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-slate-800 px-6 pt-6 text-xs text-slate-500">
        Built for project demo and viva explanation.
      </div>
    </footer>
  );
}
