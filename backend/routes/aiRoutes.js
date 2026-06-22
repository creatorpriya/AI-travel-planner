const express =
  require("express");

const router =
  express.Router();

const authMiddleware =
  require(
    "../middleware/authMiddleware"
  );

const {
  generateTripPlan
} = require(
  "../controllers/aiController"
);

router.post(
  "/generate",
  authMiddleware,
  generateTripPlan
);

module.exports = router;