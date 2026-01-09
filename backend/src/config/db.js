import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,  
  user: 'root',           // ajusta según tu entorno
  password: '',           // idem
  database: 'reservas_app',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool