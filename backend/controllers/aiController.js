const generateTravelPlan =
  require("../services/geminiService");

const Trip =
  require("../models/Trip");

const generateTripPlan =
  async (req, res) => {

    try {

      const { tripId } =
        req.body;

      const trip =
        await Trip.findById(
          tripId
        );

      if (!trip) {
        return res
          .status(404)
          .json({
            message:
              "Trip not found"
          });
      }

      const aiResult =
        await generateTravelPlan({
          destination:
            trip.destination,
          numberOfDays:
            trip.numberOfDays,
          budgetType:
            trip.budgetType,
          interests:
            trip.interests
        });

      console.log(
        "FULL AI RESULT:"
      );

      console.log(
        JSON.stringify(
          aiResult,
          null,
          2
        )
      );

      console.log(
        "SCHEMA HOTELS:"
      );

      console.log(
        Trip.schema.path(
          "hotels"
        )
      );

      trip.itinerary =
        Array.isArray(
          aiResult.itinerary
        )
          ? aiResult.itinerary
          : [];

      trip.budget =
        aiResult.budget || {};

      trip.hotels =
        Array.isArray(
          aiResult.hotels
        )
          ? aiResult.hotels
          : [];

      console.log(
        "FINAL HOTELS:"
      );

      console.log(
        trip.hotels
      );

      await trip.save();

      return res.json({
        message:
          "Trip plan generated successfully",
        trip
      });

    } catch (error) {

      console.error(
        "AI CONTROLLER ERROR:"
      );

      console.error(error);

      return res
        .status(500)
        .json({
          message:
            "Failed to generate trip plan",
          error:
            error.message
        });
    }
};

module.exports = {
  generateTripPlan
};