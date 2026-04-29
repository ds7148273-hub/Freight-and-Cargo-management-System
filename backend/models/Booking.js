import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    location: { type: String, required: true },
    note: { type: String, default: "" },
    time: { type: String, required: true },
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    freightType: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryLocation: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Booked", "Scheduled", "In Transit", "Delivered"],
      default: "Booked",
    },
    liveLocation: {
      type: String,
      required: true,
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    trackingEvents: {
      type: [eventSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
