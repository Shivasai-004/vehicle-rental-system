import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function User() {

  const [vehicles, setVehicles] = useState([])
  const [rentals, setRentals] = useState([])

  useEffect(() => {
    fetchVehicles()
    fetchRentals()
  }, [])

  const fetchVehicles = () => {

    axios.get('http://localhost:8080/vehicles')
      .then(response => {
        setVehicles(response.data)
      })
      .catch(error => {
        console.error('Error fetching vehicles:', error)
      })
  }

  const fetchRentals = () => {

    axios.get('http://localhost:8080/rentals')
      .then(response => {
        setRentals(response.data)
      })
      .catch(error => {
        console.error('Error fetching rentals:', error)
      })
  }

  const handleReturn = (rentalId) => {

    const confirmReturn = window.confirm(
      'Are you sure you want to return this vehicle?'
    )

    if (!confirmReturn) {
      return
    }

    axios.post(`http://localhost:8080/rentals/${rentalId}/return`)
      .then(response => {

        alert(response.data)

        fetchRentals()
        fetchVehicles()

      })
      .catch(error => {

        console.error('Error returning vehicle:', error)

        alert('Failed to return vehicle.')

      })
  }

  const availableVehicles = vehicles.filter(
    vehicle => vehicle.available
  )

  return (

    <main className="user-page">

      {/* USER NAVIGATION */}

      <section className="user-navigation">

        <Link to="/user">
          🏠 Home
        </Link>

        <a href="#available-vehicles">
          🚗 Available Vehicles
        </a>

        <a href="#my-rentals">
          📋 My Rentals
        </a>

        <Link to="/">
          🔙 Portal
        </Link>

      </section>


      {/* USER HEADER */}

      <section className="user-header">

        <h1>
          User Portal
        </h1>

        <p>
          Browse available vehicles and choose
          the vehicle you want to rent.
        </p>

      </section>


      {/* AVAILABLE VEHICLES */}

      <section
        className="user-vehicle-section"
        id="available-vehicles"
      >

        <h2>
          Available Vehicles
        </h2>

        {availableVehicles.length === 0 ? (

          <p>
            No vehicles are currently available.
          </p>

        ) : (

          <div className="user-vehicle-grid">

            {availableVehicles.map(vehicle => (

              <div
                className="user-vehicle-card"
                key={vehicle.id}
              >

                <div className="user-vehicle-icon">
                  🚗
                </div>

                <h3>
                  {vehicle.brand} {vehicle.model}
                </h3>

                <p>
                  Vehicle Number: {vehicle.vehicleNumber}
                </p>

                <p>
                  Type: {vehicle.type}
                </p>

                <p>
                  ₹{vehicle.pricePerDay} / day
                </p>

                <span className="available-status">
                  🟢 Available
                </span>

                <Link
                  to="/rentals"
                  state={{
                    vehicleId: vehicle.id
                  }}
                >
                  <button>
                    Rent Vehicle
                  </button>
                </Link>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* MY RENTALS */}

      <section
        className="user-rentals-section"
        id="my-rentals"
      >

        <h2>
          My Rentals
        </h2>

        {rentals.length === 0 ? (

          <p>
            No rentals found.
          </p>

        ) : (

          <div className="user-rentals-grid">

            {rentals.map(rental => (

              <div
                className="user-rental-card"
                key={rental.id}
              >

                <h3>
                  Rental #{rental.id}
                </h3>

                <p>
                  🚗 Vehicle ID: {rental.vehicleId}
                </p>

                <p>
                  👤 Customer ID: {rental.customerId}
                </p>

                <p>
                  📅 Start Date: {rental.startDate}
                </p>

                <p>
                  📅 End Date: {rental.endDate}
                </p>

                <p>
                  💰 Total Amount: ₹{rental.totalAmount}
                </p>

                <p>
                  Status:{' '}

                  {rental.returned ? (
                    <span>
                      🟢 Returned
                    </span>
                  ) : (
                    <span>
                      🔴 Active
                    </span>
                  )}

                </p>

                {!rental.returned && (

                  <button
                    onClick={() => handleReturn(rental.id)}
                  >
                    Return Vehicle
                  </button>

                )}

              </div>

            ))}

          </div>

        )}

      </section>

    </main>

  )
}

export default User