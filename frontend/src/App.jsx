
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Vehicles from './pages/Vehicles'
import Customers from './pages/Customers'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <h2>Vehicle Rental System</h2>

        <div>
          <Link to="/">Home</Link>
          <Link to="/vehicles">Vehicles</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/rentals">Rentals</Link>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <main>
              <h1>Welcome to Vehicle Rental System</h1>
              <p>
                Manage vehicles, customers and rentals easily.
              </p>

              <div>
                <Link to="/vehicles">
                  <button>View Vehicles</button>
                </Link>

                <button>Rent a Vehicle</button>
              </div>
            </main>
          }
        />

        <Route path="/vehicles" element={<Vehicles />} />

        <Route path="/customers" element={<Customers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

