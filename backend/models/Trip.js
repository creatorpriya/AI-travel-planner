const mongoose = require("mongoose");

const hotelSchema =
  new mongoose.Schema(
    {
      name: String,
      type: String
    },
    {
      _id: false
    }
  );

const itinerarySchema =
  new mongoose.Schema(
    {
      day: Number,
      activities: [String]
    },
    {
      _id: false
    }
  );

const tripSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },

      destination: String,

      numberOfDays: Number,

      budgetType: String,

      interests: [String],

      itinerary: [itinerarySchema],

      budget: {
        flights: Number,
        hotel: Number,
        food: Number,
        activities: Number,
        total: Number
      },

      hotels: [hotelSchema]
    },
    {
      timestamps: true
    }
  );

module.exports =
  mongoose.models.Trip ||
  mongoose.model(
    "Trip",
    tripSchema
  );