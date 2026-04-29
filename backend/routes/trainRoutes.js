import express from "express";
import { createTrain, getTrains } from "../controllers/trainController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getTrains);
router.post("/", protect, authorize("admin"), createTrain);

export default router;
