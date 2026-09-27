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

      const [vehiclesResponse, customersResponse, rentalsResponse] =
        await Promise.all([
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

  return (

    <main className="dashboard-page">

      {/* Header */}

      <section className="dashboard-header">

        <h1>
          Vehicle Rental Dashboard
        </h1>

        <p>
          Overview of vehicles, customers and rentals
        </p>

      </section>


      {/* Statistics */}

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


      {/* Quick Actions */}

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


      {/* Existing Dashboard Cards */}

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