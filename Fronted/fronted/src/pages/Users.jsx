import { useEffect, useState } from 'react'

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(res => res.json())
      .then(data => {
        if (data.ok) setUsers(data.data)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Usuarios</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
