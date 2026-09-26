import { useEffect, useState } from 'react'
import axios from 'axios'

function Vehicles() {
  const [vehicles, setVehicles] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8080/vehicles')
      .then((response) => {
        setVehicles(response.data)
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error)
      })
  }, [])

return (
  <div className="vehicles-page">
    <h1>Available Vehicles</h1>

    <div className="vehicle-container">
      {vehicles.map((vehicle) => (
        <div className="vehicle-card" key={vehicle.id}>
          <h2>
            {vehicle.brand} {vehicle.model}
          </h2>

          <p>Vehicle Number: {vehicle.vehicleNumber}</p>
          <p>Type: {vehicle.type}</p>
          <p>Price Per Day: ₹{vehicle.pricePerDay}</p>
<p className={vehicle.available ? 'available' : 'not-available'}>
  {vehicle.available ? '🟢 Available' : '🔴 Not Available'}
</p>

          <button disabled={!vehicle.available}>
  {vehicle.available ? 'Rent Vehicle' : 'Not Available'}
</button>
        </div>
      ))}
    </div>
  </div>
)
}

export default Vehicles