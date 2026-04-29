import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [message, setMessage] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.email || !form.password) {
      setMessage("Please enter both email and password.");
      return;
    }

    setMessage(`Welcome back! Signed in as ${form.email}.`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500"
        >
          ← Back To Home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/75 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
              Access Portal
            </p>
            <h1 className="mt-3 text-4xl font-black">Rail Freight Login</h1>
            <p className="mt-4 text-slate-300">
              Sign in to manage shipments, track live movement, and coordinate with your operations team.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-wide text-cyan-200">Control Tower</p>
                <p className="mt-2 text-sm text-slate-300">Unified dashboard for status and route intelligence.</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-wide text-cyan-200">Alerts</p>
                <p className="mt-2 text-sm text-slate-300">Exception alerts for delays, handoffs, and arrivals.</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-700 bg-slate-900/85 p-8">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="mt-2 text-sm text-slate-300">Use your registered account credentials.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">Work Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="ops@company.com"
                  className="w-full rounded-md border border-slate-600 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(event) => updateField("password", event.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-md border border-slate-600 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(event) => updateField("remember", event.target.checked)}
                />
                Keep me signed in
              </label>

              <button
                type="submit"
                className="w-full rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Sign In
              </button>
            </form>

            {message && (
              <p className="mt-4 rounded-md border border-cyan-400/40 bg-cyan-500/15 px-4 py-3 text-sm text-cyan-100">
                {message}
              </p>
            )}

            <p className="mt-5 text-sm text-slate-400">
              Need an account?{" "}
              <a href="#" className="font-semibold text-amber-300 hover:text-amber-200">
                Request access
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
