//-------------------Librerias--------------------
const express = require('express');

// Importar rutas
const ayudantiasRoutes = require('./routes/ayudantiasRoutes');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const testRoutes = require('./routes/testRoutes');

//------------------Inicialización------------------
const app = express();
const port = 5000;

//------------------Middlewares & Rutas-------------
app.use(express.json());

// Montar rutas
app.use('/api/ayudantias', ayudantiasRoutes);
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/test', testRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de PAU! Usa /api/ayudantias para ver las vacantes.');
});

//------------------Ejecución-----------------------
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});