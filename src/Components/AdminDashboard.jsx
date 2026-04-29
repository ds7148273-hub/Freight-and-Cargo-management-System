import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

const emptyTrain = {
  trainNumber: "",
  trainName: "",
  source: "",
  destination: "",
  departureTime: "",
  arrivalTime: "",
  pricePerTon: "",
  availableCapacity: "",
};

const adminLinks = [{ label: "Admin Dashboard", to: "/dashboard/admin" }];

export default function AdminDashboard() {
  const { token } = useAuth();
  const [trainForm, setTrainForm] = useState(emptyTrain);
  const [statusForm, setStatusForm] = useState({});
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [trainResponse, bookingResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/trains`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }),
      ]);
      setTrains(trainResponse.data);
      setBookings(bookingResponse.data);
    } catch (loadError) {
      setError(loadError.response?.data?.message || loadError.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTrainChange = (event) => {
    setTrainForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleTrainSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post(
        `${API_BASE_URL}/trains`,
        {
          ...trainForm,
          pricePerTon: Number(trainForm.pricePerTon),
          availableCapacity: Number(trainForm.availableCapacity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setTrainForm(emptyTrain);
      setMessage("Train schedule added successfully.");
      loadData();
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message);
    }
  };

  const updateStatusInput = (bookingId, key, value) => {
    setStatusForm((prev) => ({
      ...prev,
      [bookingId]: {
        ...prev[bookingId],
        [key]: value,
      },
    }));
  };

  const handleStatusSubmit = async (bookingId) => {
    setError("");
    setMessage("");

    try {
      const payload = statusForm[bookingId] || {};
      await axios.patch(`${API_BASE_URL}/bookings/${bookingId}/status`, payload, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setMessage("Booking status updated successfully.");
      loadData();
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message);
    }
  };

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Add train timings and destinations, then monitor every user booking from one place."
      links={adminLinks}
    >
      {message && <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100">{message}</p>}
      {error && <p className="rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-100">{error}</p>}

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Add Train</p>
          <h2 className="mt-3 text-2xl font-bold">Create a train schedule</h2>
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleTrainSubmit}>
            {Object.entries(emptyTrain).map(([key]) => (
              <input
                key={key}
                name={key}
                value={trainForm[key]}
                onChange={handleTrainChange}
                placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase())}
                className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-cyan-400"
                required
              />
            ))}
            <button className="rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 sm:col-span-2">
              Save Schedule
            </button>
          </form>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">Train List</p>
          <h2 className="mt-3 text-2xl font-bold">Available routes</h2>
          <div className="mt-6 space-y-4">
            {trains.map((train) => (
              <div key={train._id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{train.trainNumber} - {train.trainName}</p>
                    <p className="mt-1 text-sm text-slate-300">{train.source} to {train.destination}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {train.departureTime} - {train.arrivalTime}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-400">Capacity: {train.availableCapacity} tons | Price: Rs. {train.pricePerTon}/ton</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300">Booking Control</p>
        <h2 className="mt-3 text-2xl font-bold">Manage customer bookings</h2>
        <div className="mt-6 space-y-5">
          {bookings.length === 0 ? (
            <p className="text-sm text-slate-400">No bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{booking.trackingId}</p>
                    <p className="text-sm text-slate-300">{booking.user?.name} | {booking.train?.source} to {booking.train?.destination}</p>
                    <p className="mt-1 text-sm text-slate-400">Freight: {booking.freightType} | Status: {booking.status}</p>
                  </div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                    <p>Live location: {booking.liveLocation}</p>
                    <p>Total price: Rs. {booking.totalPrice}</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-[180px_1fr_1fr_auto]">
                  <select
                    value={statusForm[booking._id]?.status || booking.status}
                    onChange={(event) => updateStatusInput(booking._id, "status", event.target.value)}
                    className="rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm"
                  >
                    <option>Booked</option>
                    <option>Scheduled</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                  </select>
                  <input
                    value={statusForm[booking._id]?.liveLocation || booking.liveLocation}
                    onChange={(event) => updateStatusInput(booking._id, "liveLocation", event.target.value)}
                    placeholder="Live location"
                    className="rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm"
                  />
                  <input
                    value={statusForm[booking._id]?.note || ""}
                    onChange={(event) => updateStatusInput(booking._id, "note", event.target.value)}
                    placeholder="Short note"
                    className="rounded-md border border-slate-700 bg-slate-900 px-4 py-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleStatusSubmit(booking._id)}
                    className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-950"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
