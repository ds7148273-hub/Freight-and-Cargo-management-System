import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ links }) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500 font-black text-slate-950">FM</div>
          <div>
            <p className="text-sm font-semibold text-white">Freight Management</p>
            <p className="text-xs text-amber-300">Rail Cargo System</p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.label} to={link.to} className="text-sm font-medium text-slate-200 transition hover:text-amber-300">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to={user.role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
              className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="hidden rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 md:inline-flex">
                Login
              </Link>
              <Link to="/register" className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
