import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import DashboardLayout from "./DashboardLayout";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5001/api";

const bookingTemplate = {
  trainId: "",
  freightType: "",
  weight: "",
  quantity: "",
  pickupLocation: "",
  deliveryLocation: "",
};

const userLinks = [{ label: "User Dashboard", to: "/dashboard/user" }];

export default function UserDashboard() {
  const { token } = useAuth();
  const [trains, setTrains] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState(bookingTemplate);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [trainResponse, bookingResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/trains`, { withCredentials: true }),
        axios.get(`${API_BASE_URL}/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }),
      ]);
      const trainData = trainResponse.data;
      const bookingData = bookingResponse.data;
      setTrains(trainData);
      setBookings(bookingData);
      setFormData((prev) => ({
        ...prev,
        trainId: prev.trainId || trainData[0]?._id || "",
      }));
    } catch (loadError) {
      setError(loadError.response?.data?.message || loadError.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const latestBooking = bookings[0];
  const deliveredCount = useMemo(
    () => bookings.filter((booking) => booking.status === "Delivered").length,
    [bookings]
  );

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await axios.post(
        `${API_BASE_URL}/bookings`,
        {
          ...formData,
          weight: Number(formData.weight),
          quantity: Number(formData.quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setMessage("Booking created successfully.");
      setFormData({ ...bookingTemplate, trainId: trains[0]?._id || "" });
      loadData();
    } catch (submitError) {
      setError(submitError.response?.data?.message || submitError.message);
    }
  };

  return (
    <DashboardLayout
      title="User Dashboard"
      subtitle="Book freight, check order status, track live shipments, and review your booking history."
      links={userLinks}
    >
      {message && <p className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100">{message}</p>}
      {error && <p className="rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-3 text-sm text-rose-100">{error}</p>}

      <section className="grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Live Tracking</p>
          <h2 className="mt-3 text-3xl font-black">{latestBooking?.trackingId || "No booking yet"}</h2>
          <p className="mt-3 text-sm text-slate-300">Current location: {latestBooking?.liveLocation || "Create a booking to start tracking."}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300">Order Status</p>
          <h2 className="mt-3 text-3xl font-black">{latestBooking?.status || "Pending"}</h2>
          <p className="mt-3 text-sm text-slate-300">Most recent route: {latestBooking ? `${latestBooking.train?.source} to ${latestBooking.train?.destination}` : "No route selected yet."}</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Booking History</p>
          <h2 className="mt-3 text-3xl font-black">{bookings.length}</h2>
          <p className="mt-3 text-sm text-slate-300">Delivered bookings: {deliveredCount}</p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-300">New Booking</p>
          <h2 className="mt-3 text-2xl font-bold">Book freight as per your need</h2>
          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
            <select
              name="trainId"
              value={formData.trainId}
              onChange={handleChange}
              className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm sm:col-span-2"
              required
            >
              <option value="">Select train</option>
              {trains.map((train) => (
                <option key={train._id} value={train._id}>
                  {train.trainNumber} - {train.source} to {train.destination}
                </option>
              ))}
            </select>
            <input name="freightType" value={formData.freightType} onChange={handleChange} placeholder="Freight type" className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
            <input name="weight" type="number" value={formData.weight} onChange={handleChange} placeholder="Weight in tons" className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
            <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
            <input name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="Pickup location" className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
            <input name="deliveryLocation" value={formData.deliveryLocation} onChange={handleChange} placeholder="Delivery location" className="rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-sm" required />
            <button className="rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-950 sm:col-span-2">
              Book Freight
            </button>
          </form>
        </article>

        <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200">Available Trains</p>
          <h2 className="mt-3 text-2xl font-bold">Choose by destination and timings</h2>
          <div className="mt-6 space-y-4">
            {trains.map((train) => (
              <div key={train._id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{train.trainName}</p>
                    <p className="mt-1 text-sm text-slate-300">{train.source} to {train.destination}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                    {train.departureTime} - {train.arrivalTime}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-400">Train no: {train.trainNumber} | Capacity: {train.availableCapacity} tons | Rs. {train.pricePerTon}/ton</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-300">History</p>
        <h2 className="mt-3 text-2xl font-bold">Your bookings and tracking timeline</h2>
        <div className="mt-6 space-y-5">
          {bookings.length === 0 ? (
            <p className="text-sm text-slate-400">No bookings yet.</p>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold text-white">{booking.trackingId}</p>
                    <p className="text-sm text-slate-300">{booking.train?.trainName} | {booking.train?.source} to {booking.train?.destination}</p>
                  </div>
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200">
                    {booking.status}
                  </span>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Freight: {booking.freightType}</div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Weight: {booking.weight} tons</div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Live: {booking.liveLocation}</div>
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">Price: Rs. {booking.totalPrice}</div>
                </div>
                <div className="mt-4 space-y-3">
                  {booking.trackingEvents.map((eventItem, index) => (
                    <div key={`${booking._id}-${index}`} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
                      <span className="font-semibold text-white">{eventItem.label}</span> at {eventItem.location} - {eventItem.time}
                      {eventItem.note ? <span className="block text-slate-400">{eventItem.note}</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </DashboardLayout>
  );
}
