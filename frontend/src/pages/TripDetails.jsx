import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import jsPDF from "jspdf";

function TripDetails() {

  const { id } = useParams();

  const [trip, setTrip] = useState(null);

  const [packingList, setPackingList] =
    useState(null);

  const [newActivity, setNewActivity] =
    useState("");

  const [selectedDay, setSelectedDay] =
    useState(1);

  useEffect(() => {

    loadTrip();
    loadPackingList();

  }, []);

  const loadTrip = async () => {

    try {

      const res =
        await API.get(
          `/trips/${id}`
        );

      setTrip(
        res.data
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to load trip"
      );

    }
  };

  const loadPackingList = async () => {

    try {

      const res =
        await API.get(
          `/trips/${id}/packing-list`
        );

      setPackingList(
        res.data
      );

    } catch (error) {

      console.log(error);

    }
  };

  const addActivity = async () => {

    if (!newActivity)
      return;

    try {

      await API.put(
        `/trips/${id}/add-activity`,
        {
          day: selectedDay,
          activity: newActivity
        }
      );

      setNewActivity("");

      loadTrip();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to add activity"
      );

    }
  };

  const removeActivity = async (
    day,
    index
  ) => {

    try {

      await API.put(
        `/trips/${id}/remove-activity`,
        {
          day,
          index
        }
      );

      loadTrip();

    } catch (error) {

      console.log(error);

      alert(
        "Failed to remove activity"
      );

    }
  };

  const downloadPDF = () => {

  const doc = new jsPDF();

  let y = 20;

  doc.setFontSize(20);

  doc.text(
    `${trip.destination} Trip Plan`,
    20,
    y
  );

  y += 20;

  doc.setFontSize(14);

  doc.text(
    "Budget Breakdown",
    20,
    y
  );

  y += 10;

  doc.text(
    `Flights: $${trip.budget?.flights}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Hotel: $${trip.budget?.hotel}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Food: $${trip.budget?.food}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Activities: $${trip.budget?.activities}`,
    20,
    y
  );

  y += 8;

  doc.text(
    `Total: $${trip.budget?.total}`,
    20,
    y
  );

  y += 20;

  trip.itinerary.forEach((day) => {

    doc.setFontSize(15);

    doc.text(
      `Day ${day.day}`,
      20,
      y
    );

    y += 10;

    doc.setFontSize(12);

    day.activities.forEach((activity) => {

      doc.text(
        `• ${activity}`,
        25,
        y
      );

      y += 8;

      if (y > 270) {

        doc.addPage();

        y = 20;

      }

    });

    y += 10;

  });

  doc.save(
    `${trip.destination}-Trip.pdf`
  );

};

  if (!trip)
    return (
      <h1 className="loading">
        Loading...
      </h1>
    );

  return (

    <div className="container">

      <h1>
        ✈️ {trip.destination}
      </h1>

      {/* Budget */}

      <div className="budget-card">

        <h2>
          💰 Budget Breakdown
        </h2>

        <p>
          ✈ Flights: $
          {trip.budget?.flights}
        </p>

        <p>
          🏨 Hotel: $
          {trip.budget?.hotel}
        </p>

        <p>
          🍜 Food: $
          {trip.budget?.food}
        </p>

        <p>
          🎡 Activities: $
          {trip.budget?.activities}
        </p>

        <h3>
          Total: $
          {trip.budget?.total}
        </h3>

      </div>

      <br />

      {/* Hotels */}

      <h2>
        🏨 Hotels
      </h2>

      {
        trip.hotels?.map(
          (hotel, index) => (

            <div
              key={index}
              className="hotel-card"
            >

              <h3>
                {hotel.name}
              </h3>

              <p>
                {hotel.type}
              </p>

            </div>

          )
        )
      }

      <br />

      {/* Itinerary */}

      <h2>
        📅 Itinerary
      </h2>

      {
        trip.itinerary?.map(
          (day) => (

            <div
              key={day.day}
              className="day-card"
            >

              <h3>
                Day {day.day}
              </h3>

              <ul>

                {
                  day.activities.map(
                    (
                      activity,
                      index
                    ) => (

                      <li key={index}>

                        {activity}

                        <button
                          style={{
                            marginLeft: "15px",
                            background: "#ff4d4d"
                          }}
                          onClick={() =>
                            removeActivity(
                              day.day,
                              index
                            )
                          }
                        >
                          Remove
                        </button>

                      </li>

                    )
                  )
                }

              </ul>

            </div>

          )
        )
      }

      <br />

      {/* Add Activity */}

      <div className="day-card">

        <h2>
          ➕ Add Activity
        </h2>

        <select
          value={selectedDay}
          onChange={(e) =>
            setSelectedDay(
              Number(
                e.target.value
              )
            )
          }
        >

          {
            trip.itinerary.map(
              (day) => (

                <option
                  key={day.day}
                  value={day.day}
                >
                  Day {day.day}
                </option>

              )
            )
          }

        </select>

        <br /><br />

        <input
          type="text"
          placeholder="Enter activity"
          value={newActivity}
          onChange={(e) =>
            setNewActivity(
              e.target.value
            )
          }
        />

        <br /><br />

        <button
          onClick={addActivity}
        >
          Add Activity
        </button>

      </div>

      <br />

      {/* Packing List */}

      {
        packingList && (

          <div className="day-card">

            <h2>
              🎒 Smart Packing List
            </h2>

            <h3>
              👕 Clothes
            </h3>

            <ul>
              {
                packingList.clothes.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )
              }
            </ul>

            <h3>
              📱 Electronics
            </h3>

            <ul>
              {
                packingList.electronics.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )
              }
            </ul>

            <h3>
              📄 Documents
            </h3>

            <ul>
              {
                packingList.documents.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )
              }
            </ul>

            <h3>
              🧴 Essentials
            </h3>

            <ul>
              {
                packingList.essentials.map(
                  (item, index) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )
              }
            </ul>

          </div>

        )
      }

      <br />

      <br />

<button
  onClick={downloadPDF}
>
  📄 Download PDF
</button>

<br />
<br />

      <Link to="/dashboard">

        <button>
          ← Back to Dashboard
        </button>

      </Link>

    </div>

  );

}

export default TripDetails;