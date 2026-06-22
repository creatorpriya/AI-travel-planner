import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function Dashboard() {

  const [trips, setTrips] =
    useState([]);

  useEffect(() => {

    fetchTrips();

  }, []);

  const fetchTrips = async () => {

    try {

      const res =
        await API.get("/trips");

      setTrips(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const deleteTrip = async (id) => {

    if (
      !window.confirm(
        "Delete this trip?"
      )
    ) return;

    try {

      await API.delete(
        `/trips/${id}`
      );

      setTrips(
        trips.filter(
          (trip) =>
            trip._id !== id
        )
      );

    } catch (error) {

      alert(
        "Failed to delete trip"
      );
    }
  };

  return (

    <div className="container">

      <h1>
        🌍 My Trips
      </h1>

      <Link to="/create-trip">
        <button className="primary-btn">
          + Create New Trip
        </button>
      </Link>

      <br />
      <br />

      {
        trips.length === 0 ?

          (
            <div className="empty-card">

              <h2>
                No Trips Yet ✈️
              </h2>

              <p>
                Create your first AI travel plan.
              </p>

            </div>
          )

          :

          (
            trips.map(
              (trip) => (

                <div
                  key={trip._id}
                  className="trip-card"
                >

                  <h2>
                    {trip.destination}
                  </h2>

                  <p>
                    📅 {trip.numberOfDays} Days
                  </p>

                  <p>
                    💰 {trip.budgetType}
                  </p>

                  <div className="button-row">

                    <Link
                      to={`/trip/${trip._id}`}
                    >
                      <button>
                        View
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTrip(
                          trip._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>
              )
            )
          )
      }

    </div>

  );
}

export default Dashboard;