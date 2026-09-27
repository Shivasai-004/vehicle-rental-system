
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import Portal from './pages/Portal'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Customers from './pages/Customers'
import Rental from './pages/Rental'
import User from './pages/User'

import './App.css'

function App() {

  return (

    <BrowserRouter>

      <nav>

        <h2>
          Vehicle Rental System
        </h2>

        <div>

          <Link to="/">
            Portal
          </Link>

          <Link to="/admin">
            Admin
          </Link>

          <Link to="/vehicles">
            Vehicles
          </Link>

          <Link to="/customers">
            Customers
          </Link>

          <Link to="/rentals">
            Rentals
          </Link>

        </div>

      </nav>


      <Routes>

        {/* Portal Selection */}

        <Route
          path="/"
          element={<Portal />}
        />


        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={<Dashboard />}
        />


        {/* Vehicle Management */}

        <Route
          path="/vehicles"
          element={<Vehicles />}
        />


        {/* Customer Management */}

        <Route
          path="/customers"
          element={<Customers />}
        />


        {/* Rental Management */}

        <Route
          path="/rentals"
          element={<Rental />}
        />

        <Route
  path="/user"
  element={<User />}
/>

      </Routes>

    </BrowserRouter>

  )
}

export default App

