const pool = require('./db');

const insertMockDataQuery = `
  -- 1. LIMPIAR DATOS PREVIOS (Opcional, pero recomendado para evitar duplicados de RUT/Correo)
  -- Usamos TRUNCATE con CASCADE para limpiar todo en orden.
  TRUNCATE TABLE usuarios, asignaturas, asignatura_docente, ayudantia, postulaciones RESTART IDENTITY CASCADE;

  -- 2. INSERTAR USUARIOS (Superclase)
  -- IDs asignados automáticamente: 1, 2, 3, 4, 5...
  INSERT INTO usuarios (rut_numero, rut_dv, correo, contrasena, nombre) VALUES
  (12345678, '5', 'coordinador.pau@usm.cl', 'password123', 'Dr. Roberto Matta'),    -- ID 1
  (11222333, 'K', 'profe.informatica@usm.cl', 'password123', 'Ada Lovelace'),      -- ID 2
  (20444555, '0', 'estudiante.pau@usm.cl', 'password123', 'Víctor Jara'),          -- ID 3
  (18555666, '7', 'jefe.carrera@usm.cl', 'password123', 'Eloísa Díaz'),            -- ID 4
  (21666777, '2', 'ayudante.pro@usm.cl', 'password123', 'Gabriela Mistral');       -- ID 5

  -- 3. ASIGNAR ROLES (Herencia)
  INSERT INTO docentes (usuario_id, departamento) VALUES
  (1, 'Informática'),
  (2, 'Informática');

  INSERT INTO jefaturas (usuario_id, carrera_supervisa) VALUES
  (4, 'Ingeniería Civil Informática');

  INSERT INTO estudiantes (usuario_id, carrera, situacion_academica, estado_cursoEAA) VALUES
  (3, 'Ingeniería Civil Informática', 'Regular', 'Aprovado'),
  (5, 'Ingeniería Civil Matemática', 'Regular', 'Aprovado');

  -- 4. INSERTAR ASIGNATURAS (Depende de Jefatura)
  INSERT INTO asignaturas (nombre_asignatura, departamento, jefatura_id) VALUES
  ('Estructuras de Datos', 'Informática', 4),
  ('Programación de Software', 'Informática', 4);

  -- 5. RELACIÓN MUCHOS A MUCHOS: ASIGNATURA_DOCENTE
  INSERT INTO asignatura_docente (asignatura_id, docente_id) VALUES
  (1, 1), -- Roberto en Estructuras
  (1, 2), -- Ada en Estructuras
  (2, 2); -- Ada en Programación

  -- 6. INSERTAR AYUDANTÍAS (Vacantes)
  INSERT INTO ayudantia (tipo_ayudantia, cantidad_cupos, carga_horaria, requisitos, asignatura_id, docente_id) VALUES
  ('Laboratorio', 2, 6, 'Haber aprobado con nota > 80 y manejo de C++', 1, 1),
  ('Cátedra', 1, 4, 'Promedio general > 75', 2, 2);

  -- 7. INSERTAR POSTULACIONES
  INSERT INTO postulaciones (estado_actual, ayudantia_id, estudiante_id, jefatura_id) VALUES
  ('En Revisión', 1, 3, 4),
  ('Aceptada', 2, 5, 4);
`;

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