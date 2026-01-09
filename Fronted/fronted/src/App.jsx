// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import Users from './pages/Users'
import Reservations from './pages/Reservations'

function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="users" element={<Users />} />
          <Route path="reservations" element={<Reservations />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
