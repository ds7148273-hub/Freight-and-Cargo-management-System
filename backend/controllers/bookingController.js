import Booking from "../models/Booking.js";
import Train from "../models/Train.js";

const createTrackingId = () => `TRK${Math.floor(100000 + Math.random() * 900000)}`;
const now = () => new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export const createBooking = async (req, res) => {
  try {
    const { trainId, freightType, weight, quantity, pickupLocation, deliveryLocation } = req.body;

    const train = await Train.findById(trainId);
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    const totalPrice = Number(weight) * Number(train.pricePerTon);
    const booking = await Booking.create({
      user: req.user._id,
      train: train._id,
      trackingId: createTrackingId(),
      freightType,
      weight,
      quantity,
      pickupLocation,
      deliveryLocation,
      status: "Booked",
      liveLocation: train.source,
      totalPrice,
      trackingEvents: [
        {
          label: "Booking created",
          location: train.source,
          note: "Shipment request created by user",
          time: now(),
        },
      ],
    });

    const populatedBooking = await booking.populate("train", "trainNumber trainName source destination departureTime arrivalTime pricePerTon");

    return res.status(201).json(populatedBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("train", "trainNumber trainName source destination departureTime arrivalTime")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("train", "trainNumber trainName source destination departureTime arrivalTime")
      .sort({ createdAt: -1 });

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBookingByTrackingId = async (req, res) => {
  try {
    const booking = await Booking.findOne({ trackingId: req.params.trackingId.toUpperCase() })
      .populate("user", "name email")
      .populate("train", "trainNumber trainName source destination departureTime arrivalTime");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status, liveLocation, note } = req.body;
    const booking = await Booking.findById(req.params.id).populate("train", "source");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status || booking.status;
    booking.liveLocation = liveLocation || booking.liveLocation;
    booking.trackingEvents.unshift({
      label: status || booking.status,
      location: liveLocation || booking.liveLocation || booking.train.source,
      note: note || "Status updated by admin",
      time: now(),
    });

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email role")
      .populate("train", "trainNumber trainName source destination departureTime arrivalTime");

    return res.json(updatedBooking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
