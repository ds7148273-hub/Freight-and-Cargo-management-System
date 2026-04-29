import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await register(formData);
      navigate("/dashboard/user");
    } catch (registerError) {
      setError(registerError.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <Link to="/" className="text-sm text-amber-300 hover:text-amber-200">Back to Home</Link>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">User Registration</p>
        <h1 className="mt-3 text-4xl font-black">Create your freight account</h1>
        <p className="mt-3 text-sm text-slate-300">New accounts are created as normal users. Admin accounts are seeded from the backend for demo purposes.</p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
          <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
          {error && <p className="rounded-md border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</p>}
          <button className="w-full rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-400">
          Already registered? <Link to="/login" className="font-semibold text-amber-300">Login here</Link>
        </p>
      </div>
    </div>
  );
}
