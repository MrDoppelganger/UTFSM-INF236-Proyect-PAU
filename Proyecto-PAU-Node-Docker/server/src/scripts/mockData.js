//-------------------Librerias--------------------
const pool = require('../config/db');

//------------------Consultas SQL------------------
/*
    ------------Query-------------------
    insertMockDataQuery: 
        Cadena de texto que limpia datos previos usando 
        TRUNCATE e inserta los datos de prueba simulados 
        (mock data) para verificar el funcionamiento del sistema.
    ----------------------------------
*/
const insertMockDataQuery = `
  -- 1. LIMPIAR DATOS PREVIOS (Opcional, pero recomendado para evitar duplicados de RUT/Correo)
  -- Usamos TRUNCATE con CASCADE para limpiar todo en orden.
  TRUNCATE TABLE usuarios, asignaturas, asignatura_docente, ayudantia, postulaciones, avance_curricular RESTART IDENTITY CASCADE;

  -- 2. INSERTAR USUARIOS (Superclase)
  -- IDs asignados automáticamente: 1, 2, 3, 4, 5...
  INSERT INTO usuarios (rut_numero, rut_dv, correo, contrasena, nombre) VALUES
  (12345678, '5', 'coordinador.pau@usm.cl', 'password123', 'Dr. Roberto Matta'),    -- ID 1
  (11222333, 'K', 'profe.informatica@usm.cl', 'password123', 'Ada Lovelace'),      -- ID 2
  (20444555, '0', 'estudiante.pau@usm.cl', 'password123', 'Víctor Jara'),          -- ID 3
  (18555666, '7', 'jefe.carrera@usm.cl', 'password123', 'Eloísa Díaz'),            -- ID 4
  (21666777, '2', 'ayudante.pro@usm.cl', 'password123', 'Gabriela Mistral'),       -- ID 5
  (15333444, '1', 'profe.tercero@usm.cl', 'password123', 'Alan Turing');           -- ID 6

  -- 3. ASIGNAR ROLES (Herencia)
  INSERT INTO docentes (usuario_id, departamento) VALUES
  (1, 'Informática'),
  (2, 'Informática'),
  (6, 'Informática');

  INSERT INTO jefaturas (usuario_id, carrera_supervisa) VALUES
  (4, 'Ingeniería Civil Informática');

  INSERT INTO estudiantes (usuario_id, carrera, situacion_academica, estado_curso_eaa) VALUES
  (3, 'Ingeniería Civil Informática', 'Regular', 'Vigente'),
  (5, 'Ingeniería Civil Matemática', 'Regular', 'Sin Realizar');

  -- 4. INSERTAR ASIGNATURAS (Depende de Jefatura)
  INSERT INTO asignaturas (nombre_asignatura, departamento, cantidad_estudiantes, coordinador_id, jefatura_id) VALUES
  ('Estructuras de Datos', 'Informática', 40, 1, 4),
  ('Programación de Software', 'Informática', 60, 6, 4),
  ('Bases de Datos', 'Informática', 50, 1, 4),
  ('Ingeniería de Software', 'Informática', 30, 2, 4),
  ('Arquitectura de Computadores', 'Informática', 45, 1, 4);

  -- 5. RELACIÓN MUCHOS A MUCHOS: ASIGNATURA_DOCENTE
  INSERT INTO asignatura_docente (asignatura_id, docente_id) VALUES
  (1, 1), -- Roberto en Estructuras (Roberto coordinador)
  (2, 2), -- Ada en Programación (Alan coordinador)
  (3, 1), -- Roberto en BD (Roberto coordinador)
  (3, 2), -- Ada en BD
  (4, 2), -- Ada en Ing Software (Ada coordinador)
  (5, 1); -- Roberto en Arquitectura (Roberto coordinador)

  -- 6. INSERTAR AYUDANTÍAS (Vacantes)
  INSERT INTO ayudantia (tipo_ayudantia, cantidad_cupos, carga_horaria, requisitos, asignatura_id, docente_id) VALUES
  ('Laboratorio', 2, 6, 'Haber aprobado con nota > 80 y manejo de C++', 1, 1),
  ('Cátedra', 1, 4, 'Promedio general > 75', 2, 2),
  ('Corrección', 3, 4, 'Aprobar BD con > 70', 3, 1),
  ('Laboratorio', 2, 6, 'Conocimientos de Docker y Node', 4, 2),
  ('Cátedra', 1, 4, 'Aprobación de Arquitectura', 5, 1);

  -- 7. INSERTAR POSTULACIONES
  INSERT INTO postulaciones (estado_actual, ayudantia_id, estudiante_id, jefatura_id) VALUES
  ('En Revisión', 1, 3, 4),
  ('Aceptada', 2, 5, 4),
  ('Aceptada', 3, 3, 4),
  ('Rechazada', 5, 3, 4);

  -- 8. AVANCE CURRICULAR
  INSERT INTO avance_curricular (estudiante_id, asignatura_id, nota) VALUES
  (3, 1, 80),
  (3, 2, 60),
  (3, 4, 95),
  (5, 1, 55),
  (5, 3, 70);
`;

//------------------ejecucion-----------------------
/*
    ------------Funcion-----------------
    runMockData: 
        Ejecuta de manera asíncrona la consulta para 
        insertar los datos falsos y cierra la conexión.

*/
const runMockData = async () => {
  try {
    console.log("⏳ Insertando datos de prueba...");
    await pool.query(insertMockDataQuery);
    console.log("✅ Datos de prueba insertados con éxito.");
  } catch (err) {
    console.error("❌ Error al insertar datos de prueba:", err);
  } finally {
    pool.end();
  }
};

runMockData();
