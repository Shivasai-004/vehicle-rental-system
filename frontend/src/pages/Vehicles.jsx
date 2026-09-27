import { useEffect, useState } from 'react'
import axios from 'axios'

function Vehicles() {
  const [vehicles, setVehicles] = useState([])
  const [customers, setCustomers] = useState([])

  const [showAddForm, setShowAddForm] = useState(false)
  const [showRentForm, setShowRentForm] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [selectedCustomer, setSelectedCustomer] = useState('')

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [editingVehicleId, setEditingVehicleId] = useState(null)

  const [vehicle, setVehicle] = useState({
    vehicleNumber: '',
    brand: '',
    model: '',
    type: '',
    pricePerDay: '',
    available: true
  })

  const fetchVehicles = () => {
    axios
      .get('http://localhost:8080/vehicles')
      .then((response) => {
        setVehicles(response.data)
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error)
      })
  }

  const fetchCustomers = () => {
    axios
      .get('http://localhost:8080/customers')
      .then((response) => {
        setCustomers(response.data)
      })
      .catch((error) => {
        console.error('Error fetching customers:', error)
      })
  }

  useEffect(() => {
    fetchVehicles()
    fetchCustomers()
  }, [])

  const clearMessages = () => {
    setSuccessMessage('')
    setErrorMessage('')
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setVehicle({
      ...vehicle,
      [name]: value
    })
  }

  const resetVehicleForm = () => {
    setVehicle({
      vehicleNumber: '',
      brand: '',
      model: '',
      type: '',
      pricePerDay: '',
      available: true
    })

    setEditingVehicleId(null)
    setShowAddForm(false)
  }

  const handleAddVehicle = (event) => {
    event.preventDefault()

    clearMessages()

    if (
      !vehicle.vehicleNumber ||
      !vehicle.brand ||
      !vehicle.model ||
      !vehicle.type ||
      !vehicle.pricePerDay
    ) {
      alert('Please fill all fields')
      return
    }

    if (Number(vehicle.pricePerDay) <= 0) {
      alert('Price per day must be greater than 0')
      return
    }

    axios
      .post('http://localhost:8080/vehicles', {
        ...vehicle,
        pricePerDay: Number(vehicle.pricePerDay)
      })
      .then((response) => {
        console.log('Vehicle added:', response.data)

        fetchVehicles()

        resetVehicleForm()

        setSuccessMessage('Vehicle added successfully!')

        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      })
      .catch((error) => {
        console.error('Error adding vehicle:', error)

        setErrorMessage(
          error.response?.data ||
          'Failed to add vehicle'
        )
      })
  }

  const handleEditVehicle = (vehicleData) => {
    clearMessages()

    setVehicle({
      vehicleNumber: vehicleData.vehicleNumber,
      brand: vehicleData.brand,
      model: vehicleData.model,
      type: vehicleData.type,
      pricePerDay: vehicleData.pricePerDay,
      available: vehicleData.available
    })

    setEditingVehicleId(vehicleData.id)
    setShowAddForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleUpdateVehicle = (event) => {
    event.preventDefault()

    clearMessages()

    if (
      !vehicle.vehicleNumber ||
      !vehicle.brand ||
      !vehicle.model ||
      !vehicle.type ||
      !vehicle.pricePerDay
    ) {
      alert('Please fill all fields')
      return
    }

    if (Number(vehicle.pricePerDay) <= 0) {
      alert('Price per day must be greater than 0')
      return
    }

    axios
      .put(
        `http://localhost:8080/vehicles/${editingVehicleId}`,
        {
          ...vehicle,
          pricePerDay: Number(vehicle.pricePerDay)
        }
      )
      .then((response) => {
        console.log('Vehicle updated:', response.data)

        fetchVehicles()

        resetVehicleForm()

        setSuccessMessage('Vehicle updated successfully!')

        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      })
      .catch((error) => {
        console.error('Error updating vehicle:', error)

        setErrorMessage(
          error.response?.data ||
          'Failed to update vehicle'
        )
      })
  }

  const handleDeleteVehicle = (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this vehicle?'
    )

    if (!confirmDelete) {
      return
    }

    clearMessages()

    axios
      .delete(`http://localhost:8080/vehicles/${id}`)
      .then((response) => {
        console.log('Vehicle deleted:', response.data)

        fetchVehicles()

        setSuccessMessage('Vehicle deleted successfully!')

        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error)

        setErrorMessage(
          error.response?.data ||
          'Failed to delete vehicle'
        )
      })
  }

  const handleRentVehicle = () => {
    clearMessages()

    if (!selectedCustomer) {
      alert('Please select a customer')
      return
    }

    if (!startDate || !endDate) {
      alert('Please select start date and end date')
      return
    }

    if (endDate < startDate) {
      alert('End date cannot be before start date')
      return
    }

    axios
      .post('http://localhost:8080/rentals', {
        vehicleId: selectedVehicle.id,
        customerId: Number(selectedCustomer),
        startDate: startDate,
        endDate: endDate,
        returned: false
      })
      .then((response) => {
        console.log('Rental created:', response.data)

        setShowRentForm(false)
        setSelectedVehicle(null)
        setSelectedCustomer('')
        setStartDate('')
        setEndDate('')

        fetchVehicles()

        setSuccessMessage('Vehicle rented successfully!')

        setTimeout(() => {
          setSuccessMessage('')
        }, 3000)
      })
      .catch((error) => {
        console.error('Error creating rental:', error)

        setErrorMessage(
          error.response?.data ||
          'Failed to rent vehicle'
        )
      })
  }

  return (
    <div className="vehicles-page">

      <div className="vehicles-header">

        <h1>Available Vehicles</h1>

        <button
          className="add-vehicle-btn"
          onClick={() => {
            clearMessages()

            setEditingVehicleId(null)

            setVehicle({
              vehicleNumber: '',
              brand: '',
              model: '',
              type: '',
              pricePerDay: '',
              available: true
            })

            setShowAddForm(true)
          }}
        >
          + Add Vehicle
        </button>

      </div>

      {successMessage && (
        <div className="success-message">
          ✅ {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          ❌ {errorMessage}
        </div>
      )}

      {showAddForm && (
        <form
          className="add-vehicle-form"
          onSubmit={
            editingVehicleId
              ? handleUpdateVehicle
              : handleAddVehicle
          }
        >

          <h2>
            {editingVehicleId
              ? 'Update Vehicle'
              : 'Add New Vehicle'}
          </h2>

          <label>Vehicle Number</label>

          <input
            type="text"
            name="vehicleNumber"
            placeholder="Enter vehicle number"
            value={vehicle.vehicleNumber}
            onChange={handleChange}
          />

          <label>Brand</label>

          <input
            type="text"
            name="brand"
            placeholder="Enter brand"
            value={vehicle.brand}
            onChange={handleChange}
          />

          <label>Model</label>

          <input
            type="text"
            name="model"
            placeholder="Enter model"
            value={vehicle.model}
            onChange={handleChange}
          />

          <label>Type</label>

          <select
            name="type"
            value={vehicle.type}
            onChange={handleChange}
          >
            <option value="">
              Select vehicle type
            </option>

            <option value="Sedan">
              Sedan
            </option>

            <option value="SUV">
              SUV
            </option>

            <option value="Hatchback">
              Hatchback
            </option>

            <option value="MUV">
              MUV
            </option>

            <option value="Luxury">
              Luxury
            </option>

            <option value="Other">
              Other
            </option>
          </select>

          <label>Price Per Day</label>

          <input
            type="number"
            name="pricePerDay"
            placeholder="Enter price per day"
            value={vehicle.pricePerDay}
            onChange={handleChange}
          />

          <div className="form-buttons">

            <button type="submit">
              {editingVehicleId
                ? 'Update Vehicle'
                : 'Add Vehicle'}
            </button>

            <button
              type="button"
              onClick={resetVehicleForm}
            >
              Cancel
            </button>

          </div>

        </form>
      )}

      {showRentForm && selectedVehicle && (
        <div className="rent-form">

          <h2>Rent Vehicle</h2>

          <p>
            Vehicle: {selectedVehicle.brand}{' '}
            {selectedVehicle.model}
          </p>

          <p>
            Vehicle Number:{' '}
            {selectedVehicle.vehicleNumber}
          </p>

          <p>
            Price Per Day: ₹
            {selectedVehicle.pricePerDay}
          </p>

          <label>Customer</label>

          <select
            value={selectedCustomer}
            onChange={(event) =>
              setSelectedCustomer(event.target.value)
            }
          >
            <option value="">
              Select customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name} - {customer.phone}
              </option>
            ))}
          </select>

          <label>Start Date</label>

          <input
            type="date"
            value={startDate}
            onChange={(event) =>
              setStartDate(event.target.value)
            }
          />

          <label>End Date</label>

          <input
            type="date"
            value={endDate}
            onChange={(event) =>
              setEndDate(event.target.value)
            }
          />

          <div className="form-buttons">

            <button
              type="button"
              onClick={handleRentVehicle}
            >
              Rent Vehicle
            </button>

            <button
              type="button"
              onClick={() => {
                setShowRentForm(false)
                setSelectedVehicle(null)
                setSelectedCustomer('')
                setStartDate('')
                setEndDate('')
              }}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      <div className="vehicle-container">

        {vehicles.map((vehicle) => (

          <div
            className="vehicle-card"
            key={vehicle.id}
          >

            <h2>
              {vehicle.brand} {vehicle.model}
            </h2>

            <p>
              Vehicle Number:{' '}
              {vehicle.vehicleNumber}
            </p>

            <p>
              Type: {vehicle.type}
            </p>

            <p>
              Price Per Day: ₹
              {vehicle.pricePerDay}
            </p>

            <p
              className={
                vehicle.available
                  ? 'available'
                  : 'not-available'
              }
            >
              {vehicle.available
                ? '🟢 Available'
                : '🔴 Not Available'}
            </p>

            <button
              disabled={!vehicle.available}
              onClick={() => {
                setSelectedVehicle(vehicle)
                setShowRentForm(true)
              }}
            >
              {vehicle.available
                ? 'Rent Vehicle'
                : 'Not Available'}
            </button>

            <button
              type="button"
              onClick={() =>
                handleEditVehicle(vehicle)
              }
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() =>
                handleDeleteVehicle(vehicle.id)
              }
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Vehicles