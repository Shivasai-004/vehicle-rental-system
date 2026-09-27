import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Rental() {

  const location = useLocation();
  const navigate = useNavigate();

  const vehicleId = location.state?.vehicleId;

  const [customerId, setCustomerId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [message, setMessage] = useState("");

  const handleRent = async (e) => {
    e.preventDefault();

    if (!vehicleId) {
      setMessage("Vehicle ID not found.");
      return;
    }

    try {

      const rental = {
        vehicleId: vehicleId,
        customerId: Number(customerId),
        startDate: startDate,
        endDate: endDate
      };

      const response = await axios.post(
        "http://localhost:8080/rentals",
        rental
      );

      setMessage(response.data);

    } catch (error) {

      if (error.response) {
        setMessage(
          typeof error.response.data === "string"
            ? error.response.data
            : "Failed to rent vehicle."
        );
      } else {
        setMessage("Unable to connect to server.");
      }

    }
  };

  return (
    <div className="rental-page">

      <h2>Rent Vehicle</h2>

      <form onSubmit={handleRent}>

        <div>
          <label>Vehicle ID</label>
          <input
            type="text"
            value={vehicleId || ""}
            readOnly
          />
        </div>

        <div>
          <label>Customer ID</label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Rent Vehicle
        </button>

      </form>

      {message && (
        <p>{message}</p>
      )}

      <button onClick={() => navigate("/user")}>
        Back to User Portal
      </button>

    </div>
  );
}

export default Rental;