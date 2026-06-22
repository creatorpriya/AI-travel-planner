const Trip = require("../models/Trip");

// CREATE TRIP
const createTrip = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const {
      destination,
      numberOfDays,
      budgetType,
      interests
    } = req.body;

    const trip = await Trip.create({
      userId: req.user.id,
      destination,
      numberOfDays,
      budgetType,
      interests
    });

    res.status(201).json(trip);

  } catch (error) {

    console.error("CREATE TRIP ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

// GET ALL USER TRIPS
const getTrips = async (req, res) => {
  try {

    console.log("User from JWT:", req.user);

    const trips = await Trip.find({
      userId: req.user.id
    });

    res.json(trips);

  } catch (error) {

    console.error("GET TRIPS ERROR:", error);

    res.status(500).json({
      message: error.message
    });

  }
};

// GET SINGLE TRIP
const getTripById = async (req, res) => {

  try {

    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trip) {

      return res.status(404).json({
        message: "Trip not found"
      });

    }

    res.json(trip);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// UPDATE TRIP
const updateTrip = async (req, res) => {

  try {

    const trip = await Trip.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      {
        new: true
      }
    );

    if (!trip) {

      return res.status(404).json({
        message: "Trip not found"
      });

    }

    res.json(trip);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// DELETE TRIP
const deleteTrip = async (req, res) => {

  try {

    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!trip) {

      return res.status(404).json({
        message: "Trip not found"
      });

    }

    res.json({
      message: "Trip deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// ADD ACTIVITY
const addActivity = async (req, res) => {

  try {

    const {
      day,
      activity
    } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {

      return res.status(404).json({
        message: "Trip not found"
      });

    }

    const dayData = trip.itinerary.find(
      d => d.day === Number(day)
    );

    if (!dayData) {

      return res.status(404).json({
        message: "Day not found"
      });

    }

    dayData.activities.push(activity);

    await trip.save();

    res.json(trip);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// REMOVE ACTIVITY
const removeActivity = async (req, res) => {

  try {

    const {
      day,
      index
    } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {

      return res.status(404).json({
        message: "Trip not found"
      });

    }

    const dayData = trip.itinerary.find(
      d => d.day === Number(day)
    );

    if (!dayData) {

      return res.status(404).json({
        message: "Day not found"
      });

    }

    dayData.activities.splice(index, 1);

    await trip.save();

    res.json(trip);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

// PACKING LIST (Creative Feature)
const getPackingList = async (req, res) => {

  try {

    const trip = await Trip.findById(req.params.id);

    if (!trip) {

      return res.status(404).json({
        message: "Trip not found"
      });

    }

    const packingList = {

      clothes: [
        "T-Shirts",
        "Jeans",
        "Jacket",
        "Shoes"
      ],

      electronics: [
        "Phone Charger",
        "Power Bank",
        "Camera"
      ],

      documents: [
        "Passport",
        "ID Card",
        "Tickets"
      ],

      essentials: [
        "Medicines",
        "Water Bottle",
        "Toiletries"
      ]

    };

    res.json(packingList);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addActivity,
  removeActivity,
  getPackingList
};