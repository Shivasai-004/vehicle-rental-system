import { useEffect, useState } from "react";
import axios from "axios";

function Customers() {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    licenseNumber: ""
  });

  // Add Customer
  const handleAddCustomer = () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.licenseNumber
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    axios.post("http://localhost:8080/customers", formData)
      .then(response => {
        console.log("Customer added:", response.data);

        return axios.get("http://localhost:8080/customers");
      })
      .then(response => {
        setCustomers(response.data);

        setFormData({
          name: "",
          email: "",
          phone: "",
          licenseNumber: ""
        });
      })
      .catch(error => {
        console.error("Error adding customer:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Delete Customer
  const handleDeleteCustomer = (id) => {

    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    axios.delete(`http://localhost:8080/customers/${id}`)
      .then(() => {
        return axios.get("http://localhost:8080/customers");
      })
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error deleting customer:", error);
      });
  };

  // Edit Customer
  const handleEditCustomer = (customer) => {

    setEditingId(customer.id);

    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      licenseNumber: customer.licenseNumber
    });
  };

  // Update Customer
  const handleUpdateCustomer = () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.licenseNumber
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);

    axios.put(`http://localhost:8080/customers/${editingId}`, formData)
      .then(response => {
        console.log("Customer updated:", response.data);

        return axios.get("http://localhost:8080/customers");
      })
      .then(response => {
        setCustomers(response.data);

        setFormData({
          name: "",
          email: "",
          phone: "",
          licenseNumber: ""
        });

        setEditingId(null);
      })
      .catch(error => {
        console.error("Error updating customer:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch Customers
  useEffect(() => {

    axios.get("http://localhost:8080/customers")
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
      });

  }, []);

  return (
    <div>

      <h1>Customers</h1>

      <div className="customer-form">

        <h2>
          {editingId !== null ? "Edit Customer" : "Add Customer"}
        </h2>

        <input
          type="text"
          placeholder="Enter name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <input
          type="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Enter phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value
            })
          }
        />

        <input
          type="text"
          placeholder="Enter license number"
          value={formData.licenseNumber}
          onChange={(e) =>
            setFormData({
              ...formData,
              licenseNumber: e.target.value
            })
          }
        />

        <button
          onClick={
            editingId !== null
              ? handleUpdateCustomer
              : handleAddCustomer
          }
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : editingId !== null
              ? "Update Customer"
              : "Add Customer"}
        </button>

      </div>

      <p>Total Customers: {customers.length}</p>

      <div>

        {customers.map(customer => (

          <div
            className="customer-card"
            key={customer.id}
          >

            <h3>{customer.name}</h3>

            <p>Customer ID: {customer.id}</p>

            <p>Email: {customer.email}</p>

            <p>Phone: {customer.phone}</p>

            <p>License Number: {customer.licenseNumber}</p>

            <button
              onClick={() => handleEditCustomer(customer)}
            >
              Edit
            </button>

            <button
              onClick={() => handleDeleteCustomer(customer.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Customers;