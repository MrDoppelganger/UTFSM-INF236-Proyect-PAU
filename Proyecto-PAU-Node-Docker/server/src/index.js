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
        asig.cantidad_alumnos,
        u_coord.nombre AS profesor_coordinador,
        (SELECT ARRAY_AGG(u_cat.nombre) 
         FROM asignatura_docente ad 
         JOIN usuarios u_cat ON ad.docente_id = u_cat.id 
         WHERE ad.asignatura_id = asig.id) AS profesores_catedra
      FROM ayudantia ay
      INNER JOIN asignaturas asig ON ay.asignatura_id = asig.id
      LEFT JOIN usuarios u_coord ON asig.coordinador_id = u_coord.id;
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener las ayudantías:", err);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta para obtener la informacion del estudiante
app.get('/api/estudiante/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT u.id, u.nombre, u.correo, e.carrera, e.situacion_academica, e.estado_cursoEAA 
      FROM usuarios u 
      INNER JOIN estudiantes e ON u.id = e.usuario_id 
      WHERE u.id = $1;
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta para obtener las postulaciones de un estudiante
app.get('/api/estudiante/:id/postulaciones', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        p.id AS postulacion_id,
        p.estado_actual,
        p.fecha_envio,
        ay.tipo_ayudantia,
        ay.carga_horaria,
        ay.requisitos,
        asig.nombre_asignatura,
        asig.departamento,
        asig.cantidad_alumnos,
        u_coord.nombre AS profesor_coordinador,
        (SELECT ARRAY_AGG(u_cat.nombre) 
         FROM asignatura_docente ad 
         JOIN usuarios u_cat ON ad.docente_id = u_cat.id 
         WHERE ad.asignatura_id = asig.id) AS profesores_catedra
      FROM postulaciones p
      INNER JOIN ayudantia ay ON p.ayudantia_id = ay.id
      INNER JOIN asignaturas asig ON ay.asignatura_id = asig.id
      LEFT JOIN usuarios u_coord ON asig.coordinador_id = u_coord.id
      WHERE p.estudiante_id = $1
      ORDER BY p.fecha_envio DESC;
    `;
    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta para obtener el avance curricular
app.get('/api/estudiante/:id/avance', async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT 
        ac.nota,
        asig.nombre_asignatura,
        asig.departamento
      FROM avance_curricular ac
      INNER JOIN asignaturas asig ON ac.asignatura_id = asig.id
      WHERE ac.estudiante_id = $1
      ORDER BY asig.nombre_asignatura ASC;
    `;
    const result = await pool.query(query, [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});