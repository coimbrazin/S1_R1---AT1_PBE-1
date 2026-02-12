import mysql from 'mysql2/promise';
import 'dotenv/config'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true, // Aguarda conexões livre
  connectionLimit: 10, // Limita o número de conexões
  queueLimit: 0 // Sem limite para a fila de conexão
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexão com o MySQL bem sucedida');
    connection.release();
  } catch (error) {
    console.error(`Erro ao conectar com o banco de dados: ${error}`);
  }
})();

export default pool;