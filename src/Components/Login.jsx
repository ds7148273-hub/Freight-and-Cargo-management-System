import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(form);
      navigate(loggedInUser.role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center rounded-md border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-500">
          Back To Home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/75 p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Access Portal</p>
            <h1 className="mt-3 text-4xl font-black">Freight System Login</h1>
            <p className="mt-4 text-slate-300">
              Login with your account to access the correct dashboard based on your role.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-wide text-cyan-200">Admin Demo</p>
                <p className="mt-2 text-sm text-slate-300">admin@freight.com</p>
                <p className="text-sm text-slate-300">admin123</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-wide text-cyan-200">User Demo</p>
                <p className="mt-2 text-sm text-slate-300">user@freight.com</p>
                <p className="text-sm text-slate-300">user123</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-700 bg-slate-900/85 p-8">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <p className="mt-2 text-sm text-slate-300">Use registered credentials to continue.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-100">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="user@freight.com"
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

              {error && <p className="rounded-md border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</p>}

              <button type="submit" disabled={loading} className="w-full rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400">
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="mt-5 text-sm text-slate-400">
              Need a user account? <Link to="/register" className="font-semibold text-amber-300 hover:text-amber-200">Register here</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
