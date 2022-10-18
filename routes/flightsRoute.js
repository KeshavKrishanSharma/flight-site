const router = require("express").Router();
const Flight = require("../models/flightModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add-flight

router.post("/add-flight", authMiddleware, async (req, res) => {
  try {
    const existingFlight = await Flight.findOne({ number: req.body.number });
    if (existingFlight) {
      return res.status(200).send({
        success: false,
        message: "Flight already exists",
      });
    }
    const newFlight = new Flight(req.body);
    await newFlight.save();
    return res.status(200).send({
      success: true,
      message: "Flight added successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// update-flight

router.post("/update-flight", authMiddleware, async (req, res) => {
  try {
    await Flight.findByIdAndUpdate(req.body._id, req.body);
    return res.status(200).send({
      success: true,
      message: "Flight updated successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// delete-flight

router.post("/delete-flight", authMiddleware, async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.body._id);
    return res.status(200).send({
      success: true,
      message: "flight deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-all-flights

router.post("/get-all-flights", authMiddleware, async (req, res) => {
  try {
    const flights = await Flight.find(req.body);
    return res.status(200).send({
      success: true,
      message: "flights fetched successfully",
      data: flights,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

// get-flight-by-id

router.post("/get-flight-by-id", authMiddleware, async (req, res) => {
  try {
    const flight = await Flight.findById(req.body._id);
    return res.status(200).send({
      success: true,
      message: "Flight fetched successfully",
      data: flight,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;