import Train from "../models/Train.js";

export const createTrain = async (req, res) => {
  try {
    const train = await Train.create(req.body);
    return res.status(201).json(train);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTrains = async (_req, res) => {
  try {
    const trains = await Train.find().sort({ createdAt: -1 });
    return res.json(trains);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
