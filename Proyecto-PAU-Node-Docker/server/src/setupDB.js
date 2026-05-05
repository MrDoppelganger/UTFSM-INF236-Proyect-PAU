const pool = require('./db');

//----------------------------Query: Creacion de tablas-----------------------------------
const setupQuery = `
  -- Reiniciamos toda las tablas para poder volver a cargarlas.
  DROP TABLE IF EXISTS nominas_pago CASCADE;
  DROP TABLE IF EXISTS postulaciones CASCADE;
  DROP TABLE IF EXISTS vacantes CASCADE;
  DROP TABLE IF EXISTS estudiantes CASCADE;
  DROP TABLE IF EXISTS asignaturas CASCADE;
  DROP TABLE IF EXISTS docentes CASCADE;
  DROP TABLE IF EXISTS jefaturas CASCADE;

  -- ==========================================
  -- 2. TABLAS PADRE E INDEPENDIENTES
  -- ==========================================

  -- Tabla "Superclase"
  CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    rut_numero INT UNIQUE NOT NULL,
    rut_dv CHAR(1) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL
  );

  CREATE TABLE asignaturas (
    id SERIAL PRIMARY KEY,
    nombre_asignatura VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL
  );

  -- ==========================================
  -- 3. TABLAS "HIJAS" (Herencia)
  -- ==========================================

  -- Nota: Su llave primaria es también llave foránea hacia 'usuarios'
  CREATE TABLE estudiantes (
    usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    carrera VARCHAR(100) NOT NULL,
    estado_matricula BOOLEAN DEFAULT TRUE,
    situacion_academica VARCHAR(50)
  );

  CREATE TABLE docentes (
    usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    departamento VARCHAR(100) NOT NULL
  );

  CREATE TABLE jefaturas (
    usuario_id INT PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    carrera_supervisa VARCHAR(100) NOT NULL
  );

  -- ==========================================
  -- 4. TABLAS DE RELACIÓN (Dependientes)
  -- ==========================================

  CREATE TABLE vacantes (
    id SERIAL PRIMARY KEY,
    tipo_ayudantia VARCHAR(50) NOT NULL,
    cantidad_cupos INT DEFAULT 1,
    carga_horaria INT NOT NULL,
    requisitos TEXT,
    asignatura_id INT REFERENCES asignaturas(id) ON DELETE CASCADE,
    docente_id INT REFERENCES docentes(usuario_id) ON DELETE SET NULL
  );

  CREATE TABLE postulaciones (
    id SERIAL PRIMARY KEY,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado_actual VARCHAR(50) DEFAULT 'En Revisión',
    vacante_id INT REFERENCES vacantes(id) ON DELETE CASCADE,
    estudiante_id INT REFERENCES estudiantes(usuario_id) ON DELETE CASCADE,
    jefatura_id INT REFERENCES jefaturas(usuario_id) ON DELETE SET NULL
  );
`;

//---------------------------Ejecucion-------------------------------------
const runSetup = async () => {
  try {
    console.log("Conectando a PostgreSQL y creando tablas...");
    await pool.query(setupQuery);
    console.log("¡Base de datos inicializada con éxito! Tablas y datos creados.");
  } catch (err) {
    console.error("Error al inicializar la base de datos:", err);
  } finally {
    // Cerramos la conexión para que el script termine automáticamente
    pool.end(); 
  }
};

runSetup();