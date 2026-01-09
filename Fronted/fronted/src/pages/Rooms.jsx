import { useEffect, useState } from 'react'

export default function Rooms() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/rooms')
      .then(res => res.json())
      .then(data => {
        if (data.ok) setRooms(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Salas</h2>
      <ul>
        {rooms.map(r => (
          <li key={r.id}>
            {r.name} - Capacidad: {r.capacity}
          </li>
        ))}
      </ul>
    </div>
  )
}
