import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CreateTrip() {

  const navigate = useNavigate();

  const [destination, setDestination] =
    useState("");

  const [numberOfDays, setNumberOfDays] =
    useState(5);

  const [budgetType, setBudgetType] =
    useState("Medium");

  const [interests, setInterests] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const interestOptions = [
    "Food",
    "Culture",
    "Shopping",
    "Nature",
    "Adventure",
    "Beach",
    "History"
  ];

  const handleInterestChange = (interest) => {

    if (interests.includes(interest)) {

      setInterests(
        interests.filter(
          (item) => item !== interest
        )
      );

    } else {

      setInterests(
        [...interests, interest]
      );

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const trip =
        await API.post(
          "/trips",
          {
            destination,
            numberOfDays,
            budgetType,
            interests
          }
        );

      const tripId =
        trip.data._id;

      await API.post(
        "/ai/generate",
        {
          tripId
        }
      );

      navigate(`/trip/${tripId}`);

    } catch (error) {

      console.log(error);

      alert(
        "Failed to create trip"
      );
    }

    setLoading(false);
  };

  return (

    <div className="container">

      <div className="glass-card">

        <h1>
          ✈️ Create Trip
        </h1>

        <form onSubmit={handleSubmit}>

          <label>
            Destination
          </label>

          <input
            type="text"
            placeholder="Tokyo"
            value={destination}
            onChange={(e) =>
              setDestination(
                e.target.value
              )
            }
            required
          />

          <label>
            Number of Days
          </label>

          <input
            type="number"
            min="1"
            value={numberOfDays}
            onChange={(e) =>
              setNumberOfDays(
                Number(e.target.value)
              )
            }
            required
          />

          <label>
            Budget Type
          </label>

          <select
            value={budgetType}
            onChange={(e) =>
              setBudgetType(
                e.target.value
              )
            }
          >

            <option value="Low">
              Low
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="High">
              High
            </option>

          </select>

          <label>
            Interests
          </label>

          <div className="interest-grid">

            {
              interestOptions.map(
                (interest) => (

                  <label
                    key={interest}
                    className={
                      interests.includes(interest)
                        ? "interest-card selected-interest"
                        : "interest-card"
                    }
                  >

                    <input
                      type="checkbox"
                      checked={
                        interests.includes(
                          interest
                        )
                      }
                      onChange={() =>
                        handleInterestChange(
                          interest
                        )
                      }
                    />

                    {interest}

                  </label>

                )
              )
            }

          </div>

          <button
            className="primary-btn"
            disabled={loading}
          >

            {
              loading
                ? "🤖 Generating AI Trip..."
                : "✨ Generate AI Trip"
            }

          </button>

        </form>

      </div>

    </div>

  );
}

export default CreateTrip;