//-------------------Librerias--------------------
const { Pool } = require('pg');

//------------------Inicialización------------------
/*
    ------------Configuración-----------
    pool: 
        Pool de conexiones a PostgreSQL utilizando 
        variables de entorno para mayor seguridad y 
        flexibilidad al desplegar con Docker.
    ----------------------------------
*/
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
