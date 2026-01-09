import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/rooms">Salas</Link>
          <Link to="/users">Usuarios</Link>
          <Link to="/reservations">Reservas</Link>
        </nav>
      </header>
      <main>
        <Outlet /> {/* <- Aquí se renderizan las rutas */}
      </main>
    </div>
  )
}
