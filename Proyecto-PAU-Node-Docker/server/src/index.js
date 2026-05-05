const express = require('express');
const pool = require('./db'); // Importar la conexión
const app = express();
const port = 5000;

// Ruta de prueba que guarda un mensaje en la base de datos
app.get('/save', async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
    await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
    res.send('Mensaje guardado en la base de datos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

// Ruta para obtener todos los mensajes
app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
});

app.get('/', (req, res) => {
  res.send('¡Bienvenido! Usa /save para guardar un mensaje y /messages para verlos.');
});

app.listen(port, () => {
  console.log(`App corriendo en http://localhost:${port}`);
});

app.get('/api/test-usuarios', async (req, res) => {
  const result = await pool.query('SELECT * FROM usuarios');
  res.json(result.rows);
});

// Ruta para obtener las vacantes de ayudantías formateadas para las Tarjetas (Cards)
app.get('/api/ayudantias', async (req, res) => {
  try {
    // Usamos JOIN para cruzar las tablas y armar un paquete de información completo
    const query = `
      SELECT 
        ay.id,
        ay.tipo_ayudantia,
        ay.cantidad_cupos,
        ay.carga_horaria,
        ay.requisitos,
        asig.nombre_asignatura,
        asig.departamento,
        u.nombre AS profesor_encargado
      FROM ayudantia ay
      INNER JOIN asignaturas asig ON ay.asignatura_id = asig.id
      LEFT JOIN docentes doc ON ay.docente_id = doc.usuario_id
      LEFT JOIN usuarios u ON doc.usuario_id = u.id;
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener las ayudantías:", err);
    res.status(500).send('Error en el servidor');
  }
});