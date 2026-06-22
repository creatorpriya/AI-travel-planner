const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  addActivity,
  removeActivity,
  getPackingList
} = require(
  "../controllers/tripController"
);

router.post(
  "/",
  authMiddleware,
  createTrip
);

router.get(
  "/",
  authMiddleware,
  getTrips
);

router.get(
  "/:id",
  authMiddleware,
  getTripById
);

router.get(
  "/:id/packing-list",
  authMiddleware,
  getPackingList
);

router.put(
  "/:id",
  authMiddleware,
  updateTrip
);

router.put(
  "/:id/add-activity",
  authMiddleware,
  addActivity
);

router.put(
  "/:id/remove-activity",
  authMiddleware,
  removeActivity
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTrip
);

module.exports = router;