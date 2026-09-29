# Vehicle Rental System

A full-stack web application for managing vehicles, customers, and vehicle rentals.

## Project Overview

The Vehicle Rental System is developed using **Java, Spring Boot, React.js, and MySQL**. It provides functionality for managing vehicles, customers, and rental operations.

The backend provides REST APIs, while the React frontend provides Admin and User portals for interacting with the application.

## Features

### Vehicle Management

* Add vehicles
* View vehicles
* Update vehicle details
* Delete vehicles
* Check vehicle availability

### Customer Management

* Add customers
* View customers
* Update customer details
* Delete customers
* Validate customer information

### Rental Management

* Create rentals
* Check vehicle availability before rental
* Calculate rental amount
* View rental records
* Update rental details
* Return vehicles
* Update vehicle availability after return

### Validation and Exception Handling

* Input validation
* Custom exceptions
* Global exception handling
* Error handling for invalid operations

### Frontend

* Admin Portal
* User Portal
* Vehicle management
* Customer management
* Rental workflow
* React Router navigation
* Axios API integration

## Technologies Used

### Backend

* Java
* Spring Boot
* Spring Data JPA
* REST APIs
* Maven

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Axios
* React Router

### Database

* MySQL

### Tools

* Eclipse
* Visual Studio Code
* Postman
* Git
* GitHub

## Project Structure

```text
Vehicle-Rental-System
│
├── src
│   └── main
│       └── java
│           └── com
│               └── rent
│                   ├── controller
│                   ├── service
│                   ├── repo
│                   ├── model
│                   ├── exception
│                   └── config
│
├── frontend
│   └── src
│       ├── pages
│       ├── App.jsx
│       └── App.css
│
├── pom.xml
└── README.md
```

## Main REST APIs

### Vehicle APIs

```text
POST   /vehicles
GET    /vehicles
GET    /vehicles/{id}
PUT    /vehicles/{id}
DELETE /vehicles/{id}
```

### Customer APIs

```text
POST   /customers
GET    /customers
GET    /customers/{id}
PUT    /customers/{id}
DELETE /customers/{id}
```

### Rental APIs

```text
POST   /rentals
GET    /rentals
GET    /rentals/{id}
PUT    /rentals/{id}
DELETE /rentals/{id}
```

## Application Flow

```text
React Frontend
      ↓
     Axios
      ↓
Spring Boot REST Controller
      ↓
Service Layer
      ↓
Repository Layer
      ↓
     MySQL
```

## How to Run

### Backend

1. Start MySQL.
2. Create the required database.
3. Configure the database connection.
4. Run the Spring Boot application.

Backend:

```text
http://localhost:8080
```

### Frontend

Open the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm run dev
```

## API Testing

The REST APIs were tested using **Postman** for:

* CRUD operations
* Validation
* Error handling
* Rental operations
* Vehicle return functionality

## Version Control

The project is maintained using **Git and GitHub** for version control and tracking project changes.

## Future Enhancements

* User authentication and authorization
* Online payment integration
* Rental history
* Advanced reports and analytics
* Cloud deployment
