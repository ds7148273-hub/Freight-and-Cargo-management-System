import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { fileURLToPath } from "node:url";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Train from "./models/Train.js";
import Booking from "./models/Booking.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";

dotenv.config({ path: fileURLToPath(new URL(".env", import.meta.url)) });

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://127.0.0.1:5173",
  "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ message: "Freight backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/trains", trainRoutes);
app.use("/api/bookings", bookingRoutes);

const seedData = async () => {
  const adminEmail = "admin@freight.com";
  const userEmail = "user@freight.com";

  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    admin = await User.create({
      name: "System Admin",
      email: adminEmail,
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });
  }

  let user = await User.findOne({ email: userEmail });
  if (!user) {
    user = await User.create({
      name: "Demo User",
      email: userEmail,
      password: await bcrypt.hash("user123", 10),
      role: "user",
    });
  }

  const trainsCount = await Train.countDocuments();
  if (trainsCount === 0) {
    await Train.insertMany([
      {
        trainNumber: "1201",
        trainName: "Western Cargo Express",
        source: "Mumbai",
        destination: "Delhi",
        departureTime: "06:00 AM",
        arrivalTime: "08:00 PM",
        pricePerTon: 1800,
        availableCapacity: 200,
      },
      {
        trainNumber: "2204",
        trainName: "Eastern Freight Line",
        source: "Kolkata",
        destination: "Chennai",
        departureTime: "09:30 AM",
        arrivalTime: "11:00 PM",
        pricePerTon: 2200,
        availableCapacity: 160,
      },
      {
        trainNumber: "3307",
        trainName: "South Connect Rail",
        source: "Bengaluru",
        destination: "Hyderabad",
        departureTime: "01:00 PM",
        arrivalTime: "09:00 PM",
        pricePerTon: 1400,
        availableCapacity: 120,
      },
    ]);
  }

  const bookingCount = await Booking.countDocuments();
  if (bookingCount === 0) {
    const firstTrain = await Train.findOne({ trainNumber: "1201" });
    if (firstTrain) {
      await Booking.create({
        user: user._id,
        train: firstTrain._id,
        trackingId: "TRK100001",
        freightType: "Industrial Equipment",
        weight: 12,
        quantity: 4,
        pickupLocation: "Navi Mumbai Yard",
        deliveryLocation: "Delhi ICD",
        status: "In Transit",
        liveLocation: "Nagpur Junction",
        totalPrice: 21600,
        trackingEvents: [
          {
            label: "In Transit",
            location: "Nagpur Junction",
            note: "Train crossed the central corridor",
            time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
          },
          {
            label: "Booked",
            location: "Mumbai",
            note: "Booking created successfully",
            time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
          },
        ],
      });
    }
  }

  console.log("Seed data ready");
  console.log("Admin login: admin@freight.com / admin123");
  console.log("User login: user@freight.com / user123");
};

const startServer = async () => {
  await connectDB();
  await seedData();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
