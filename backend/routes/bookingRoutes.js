import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingByTrackingId,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/track/:trackingId", getBookingByTrackingId);
router.get("/my", protect, authorize("user"), getMyBookings);
router.get("/", protect, authorize("admin"), getAllBookings);
router.post("/", protect, authorize("user"), createBooking);
router.patch("/:id/status", protect, authorize("admin"), updateBookingStatus);

export default router;
