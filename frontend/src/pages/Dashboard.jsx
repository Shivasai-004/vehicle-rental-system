
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {

  const [vehicles, setVehicles] = useState([])
  const [customers, setCustomers] = useState([])
  const [rentals, setRentals] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {

    try {

      const [
        vehiclesResponse,
        customersResponse,
        rentalsResponse
      ] = await Promise.all([
        axios.get('http://localhost:8080/vehicles'),
        axios.get('http://localhost:8080/customers'),
        axios.get('http://localhost:8080/rentals')
      ])

      setVehicles(vehiclesResponse.data)
      setCustomers(customersResponse.data)
      setRentals(rentalsResponse.data)

    } catch (error) {

      console.error(
        'Error fetching dashboard data:',
        error
      )

    }
  }

  /* =========================
     BASIC STATISTICS
  ========================= */

  const totalVehicles = vehicles.length

  const availableVehicles = vehicles.filter(
    vehicle => vehicle.available
  ).length

  const rentedVehicles = vehicles.filter(
    vehicle => !vehicle.available
  ).length

  const totalCustomers = customers.length

  const totalRentals = rentals.length

  const totalRevenue = rentals.reduce(
    (total, rental) =>
      total + Number(rental.totalAmount || 0),
    0
  )

  /* =========================
     REPORT STATISTICS
  ========================= */

  const activeRentals = rentals.filter(
    rental => !rental.returned
  ).length

  const returnedRentals = rentals.filter(
    rental => rental.returned
  ).length

  const utilizationRate =
    totalVehicles > 0
      ? Math.round(
          (rentedVehicles / totalVehicles) * 100
        )
      : 0

  /* =========================
     MOST RENTED VEHICLE TYPE
  ========================= */

  const rentalTypeCount = {}

  rentals.forEach((rental) => {

    const vehicleData = vehicles.find(
      vehicle => vehicle.id === rental.vehicleId
    )

    if (vehicleData) {

      const type = vehicleData.type

      rentalTypeCount[type] =
        (rentalTypeCount[type] || 0) + 1
    }
  })

  let mostRentedType = 'No data'
  let highestRentalCount = 0

  Object.entries(rentalTypeCount).forEach(
    ([type, count]) => {

      if (count > highestRentalCount) {

        highestRentalCount = count
        mostRentedType = type

      }

    }
  )

  return (

    <main className="dashboard-page">

      {/* HEADER */}

      <section className="dashboard-header">

        <h1>
          Vehicle Rental Dashboard
        </h1>

        <p>
          Overview of vehicles, customers and rentals
        </p>

      </section>


      {/* STATISTICS */}

      <section className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">
            🚗
          </div>

          <div>
            <h3>Total Vehicles</h3>
            <h2>{totalVehicles}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🟢
          </div>

          <div>
            <h3>Available Vehicles</h3>
            <h2>{availableVehicles}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            🔴
          </div>

          <div>
            <h3>Rented Vehicles</h3>
            <h2>{rentedVehicles}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            👥
          </div>

          <div>
            <h3>Total Customers</h3>
            <h2>{totalCustomers}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            📋
          </div>

          <div>
            <h3>Total Rentals</h3>
            <h2>{totalRentals}</h2>
          </div>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            💰
          </div>

          <div>
            <h3>Total Revenue</h3>

            <h2>
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h2>

          </div>

        </div>

      </section>


      {/* QUICK ACTIONS */}

      <section className="dashboard-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="quick-action-container">

          <Link to="/vehicles">
            <button>
              🚗 Manage Vehicles
            </button>
          </Link>

          <Link to="/customers">
            <button>
              👥 Manage Customers
            </button>
          </Link>

          <Link to="/rentals">
            <button>
              📋 Manage Rentals
            </button>
          </Link>

        </div>

      </section>


      {/* REPORTS */}

      <section className="reports-section">

        <div className="reports-header">

          <h2>
            Reports & Summary
          </h2>

          <p>
            Current rental activity and vehicle utilization
          </p>

        </div>


        <div className="reports-grid">

          <div className="report-card">

            <div className="report-icon">
              🔵
            </div>

            <div>
              <h3>
                Active Rentals
              </h3>

              <h2>
                {activeRentals}
              </h2>

              <p>
                Currently active rental bookings
              </p>
            </div>

          </div>


          <div className="report-card">

            <div className="report-icon">
              🟢
            </div>

            <div>
              <h3>
                Returned Rentals
              </h3>

              <h2>
                {returnedRentals}
              </h2>

              <p>
                Vehicles successfully returned
              </p>
            </div>

          </div>


          <div className="report-card">

            <div className="report-icon">
              📊
            </div>

            <div>
              <h3>
                Vehicle Utilization
              </h3>

              <h2>
                {utilizationRate}%
              </h2>

              <p>
                Vehicles currently rented
              </p>
            </div>

          </div>


          <div className="report-card">

            <div className="report-icon">
              🚘
            </div>

            <div>
              <h3>
                Most Rented Type
              </h3>

              <h2>
                {mostRentedType}
              </h2>

              <p>
                {highestRentalCount > 0
                  ? `${highestRentalCount} rental${highestRentalCount > 1 ? 's' : ''}`
                  : 'No rental data available'}
              </p>

            </div>

          </div>


          <div className="report-card">

            <div className="report-icon">
              💵
            </div>

            <div>
              <h3>
                Average Rental Value
              </h3>

              <h2>
                ₹
                {totalRentals > 0
                  ? Math.round(
                      totalRevenue / totalRentals
                    ).toLocaleString('en-IN')
                  : '0'}
              </h2>

              <p>
                Average amount per rental
              </p>
            </div>

          </div>


          <div className="report-card">

            <div className="report-icon">
              📈
            </div>

            <div>
              <h3>
                Rental Completion
              </h3>

              <h2>
                {totalRentals > 0
                  ? Math.round(
                      (returnedRentals / totalRentals) * 100
                    )
                  : 0}%
              </h2>

              <p>
                Rentals that have been returned
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* DASHBOARD CARDS */}

      <section className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            🚗
          </div>

          <h2>
            Vehicles
          </h2>

          <p>
            Add, edit, delete and manage
            vehicle availability.
          </p>

          <Link to="/vehicles">
            <button>
              Manage Vehicles
            </button>
          </Link>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            👤
          </div>

          <h2>
            Customers
          </h2>

          <p>
            Manage customer details,
            contact information and licenses.
          </p>

          <Link to="/customers">
            <button>
              Manage Customers
            </button>
          </Link>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            🔑
          </div>

          <h2>
            Rentals
          </h2>

          <p>
            Create rentals, calculate amounts,
            update and return vehicles.
          </p>

          <Link to="/rentals">
            <button>
              Manage Rentals
            </button>
          </Link>

        </div>

      </section>

    </main>
  )
}

export default Dashboard
