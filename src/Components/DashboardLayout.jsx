import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const linkClass = ({ isActive }) =>
  `rounded-md px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-amber-500 text-slate-950" : "text-slate-200 hover:bg-slate-800"
  }`;

export default function DashboardLayout({ title, subtitle, links, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link to="/" className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
              Freight Management System
            </Link>
            <h1 className="mt-2 text-3xl font-black">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">{subtitle}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-5 py-4 text-sm">
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-slate-400">{user?.email}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-cyan-200">{user?.role}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <nav className="flex flex-col gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 w-full rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
          >
            Logout
          </button>
        </aside>

        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
