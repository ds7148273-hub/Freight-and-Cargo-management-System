import mongoose from "mongoose";

const trainSchema = new mongoose.Schema(
  {
    trainNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    trainName: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String,
      required: true,
      trim: true,
    },
    arrivalTime: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerTon: {
      type: Number,
      required: true,
      min: 0,
    },
    availableCapacity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Train = mongoose.model("Train", trainSchema);

export default Train;
