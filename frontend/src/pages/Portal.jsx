
import { Link } from 'react-router-dom'

function Portal() {

  return (

    <main className="portal-page">

      <section className="portal-header">

        <h1>
          Vehicle Rental System
        </h1>

        <p>
          Choose your portal to continue
        </p>

      </section>


      <section className="portal-cards">

        {/* ADMIN PORTAL */}

        <div className="portal-card">

          <div className="portal-icon">
            🛠️
          </div>

          <h2>
            Admin Portal
          </h2>

          <p>
            Manage vehicles, customers, rentals,
            reports and the complete rental system.
          </p>

          <Link to="/admin">
            <button>
              Enter Admin Portal
            </button>
          </Link>

        </div>


        {/* USER PORTAL */}

        <div className="portal-card">

          <div className="portal-icon">
            👤
          </div>

          <h2>
            User Portal
          </h2>

          <p>
            Browse available vehicles, rent a vehicle
            and manage your rentals.
          </p>

          <Link to="/user">
            <button>
              Enter User Portal
            </button>
          </Link>

        </div>

      </section>

    </main>
  )
}

export default Portal

