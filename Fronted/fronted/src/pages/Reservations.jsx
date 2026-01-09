import { useEffect, useState } from 'react'

export default function Reservations() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/reservations')
      .then(res => res.json())
      .then(data => {
        if (data.ok) setReservations(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Reservas</h2>
      <ul>
        {reservations.map(r => (
          <li key={r.id}>
            Sala {r.room_id} - Usuario {r.user_id} - Fecha: {r.reservation_date || r.start_time} 
          </li>
        ))}
      </ul>
    </div>
  )
}
