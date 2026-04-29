import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ links }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500 font-black text-slate-950">
            RF
          </Link>
          <Link to="/">
            <p className="text-sm font-semibold text-white">Rail Freight</p>
            <p className="text-xs text-amber-300">Cargo Command Center</p>
          </Link>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium text-slate-200 transition hover:text-amber-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500"
          >
            Log In
          </Link>
          <button className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
            Get Started
          </button>
        </div>

        <button
          className="rounded-md border border-slate-700 p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm font-medium text-slate-200 transition hover:text-amber-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="mt-2 rounded-md border border-slate-700 px-4 py-2 text-left text-sm font-medium text-slate-200 transition hover:border-slate-500"
            >
              Log In
            </Link>
            <button className="rounded-md bg-amber-500 px-4 py-2 text-left text-sm font-semibold text-slate-950">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
