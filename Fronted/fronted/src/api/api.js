const BASE_URL = 'http://localhost:3000/api'

export async function getRooms() {
  const res = await fetch(`${BASE_URL}/rooms`)
  return res.json()
}

export async function getReservations() {
  const res = await fetch(`${BASE_URL}/reservations`)
  return res.json()
}

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`)
  return res.json()
}
export async function createReservation(reservation) {
  const res = await fetch(`${BASE_URL}/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reservation),
  })
  return res.json()
}