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
  (12345678, '5', 'coordinador.pau@usm.cl', 'password123', 'Dr. Roberto Matta'),   -- ID 1
  (11222333, 'K', 'profe.informatica@usm.cl', 'password123', 'Ada Lovelace'),      -- ID 2
  (20444555, '0', 'estudiante.pau@usm.cl', 'password123', 'Víctor Jara'),          -- ID 3
  (18555666, '7', 'jefe.carrera@usm.cl', 'password123', 'Eloísa Díaz'),            -- ID 4
  (21666777, '2', 'ayudante.pro@usm.cl', 'password123', 'Gabriela Mistral'),       -- ID 5
  (15333444, '1', 'profe.tercero@usm.cl', 'password123', 'Alan Turing'),           -- ID 6
  (17777888, '9', 'carl.gauss@usm.cl', 'password123', 'Carl Gauss'),               -- ID 7
  (18888999, 'K', 'isaac.newton@usm.cl', 'password123', 'Isaac Newton'),           -- ID 8
  (19999000, '1', 'marie.curie@usm.cl', 'password123', 'Marie Curie'),             -- ID 9
  (21111000, '2', 'claude.shannon@usm.cl', 'password123', 'Claude Shannon'),       -- ID 10
  (22222000, '3', 'donald.knuth@usm.cl', 'password123', 'Donald Knuth'),           -- ID 11
  (23333000, '4', 'edsger.dijkstra@usm.cl', 'password123', 'Edsger Dijkstra'),     -- ID 12
  (24444000, '5', 'barbara.liskov@usm.cl', 'password123', 'Barbara Liskov'),       -- ID 13
  (25555000, '6', 'john.neumann@usm.cl', 'password123', 'John von Neumann'),       -- ID 14
  (26666000, '7', 'alan.kay@usm.cl', 'password123', 'Alan Kay'),                   -- ID 15
  (27777000, '8', 'grace.hopper@usm.cl', 'password123', 'Grace Hopper'),           -- ID 16
  (28888000, '9', 'richard.feynman@usm.cl', 'password123', 'Richard Feynman'),     -- ID 17
  (29999000, 'K', 'nikola.tesla@usm.cl', 'password123', 'Nikola Tesla'),           -- ID 18
  (31111000, '1', 'hedy.lamarr@usm.cl', 'password123', 'Hedy Lamarr'),             -- ID 19
  (32222000, '2', 'linus.torvalds@usm.cl', 'password123', 'Linus Torvalds'),       -- ID 20
  (33333000, '3', 'andres.bello@usm.cl', 'password123', 'Andrés Bello'),           -- ID 21
  (34444000, '4', 'jose.maza@usm.cl', 'password123', 'José Maza'),                 -- ID 22
  (35555000, '5', 'gabriela.silva@usm.cl', 'password123', 'Gabriela Silva'),       -- ID 23
  (36666000, '6', 'diego.soto@usm.cl', 'password123', 'Diego Soto'),               -- ID 24
  (37777000, '7', 'camila.rojas@usm.cl', 'password123', 'Camila Rojas'),           -- ID 25
  (38888000, '8', 'felipe.munoz@usm.cl', 'password123', 'Felipe Muñoz'),           -- ID 26
  (39999000, '9', 'javiera.perez@usm.cl', 'password123', 'Javiera Pérez'),         -- ID 27
  (41111000, 'K', 'matias.torres@usm.cl', 'password123', 'Matías Torres'),         -- ID 28
  (42222000, '1', 'antonia.fuentes@usm.cl', 'password123', 'Antonia Fuentes'),     -- ID 29
  (43333000, '2', 'sebastian.diaz@usm.cl', 'password123', 'Sebastián Díaz'),       -- ID 30
  (44444000, '3', 'valentina.morales@usm.cl', 'password123', 'Valentina Morales');  -- ID 31

  -- 3. ASIGNAR ROLES (Herencia)
  INSERT INTO docentes (usuario_id, departamento) VALUES
  (1, 'Informática'),
  (2, 'Informática'),
  (6, 'Informática'),
  (7, 'Matemática'),
  (8, 'Física'),
  (9, 'Química'),
  (10, 'Informática'),
  (11, 'Informática'),
  (12, 'Informática'),
  (13, 'Informática'),
  (14, 'Matemática'),
  (15, 'Informática'),
  (16, 'Informática'),
  (17, 'Física'),
  (18, 'Electrónica'),
  (19, 'Electrónica'),
  (20, 'Informática');

  INSERT INTO jefaturas (usuario_id, carrera_supervisa) VALUES
  (4, 'Ingeniería Civil Informática'),
  (21, 'Ingeniería Civil Matemática'),
  (22, 'Ingeniería Civil Física'),
  (23, 'Ingeniería Civil Informática');

  INSERT INTO estudiantes (usuario_id, carrera, situacion_academica, estado_curso_eaa) VALUES
  (3, 'Ingeniería Civil Informática', 'Regular', 'Vigente'),
  (5, 'Ingeniería Civil Matemática', 'Regular', 'Sin Realizar'),
  (24, 'Ingeniería Civil Informática', 'Regular', 'Vigente'),
  (25, 'Ingeniería Civil Informática', 'Regular', 'Vigente'),
  (26, 'Ingeniería Civil Matemática', 'Regular', 'Vigente'),
  (27, 'Ingeniería Civil Informática', 'Regular', 'Sin Realizar'),
  (28, 'Ingeniería Civil Física', 'Regular', 'Vigente'),
  (29, 'Ingeniería Civil Informática', 'Regular', 'Vigente'),
  (30, 'Ingeniería Civil Matemática', 'Regular', 'Sin Realizar'),
  (31, 'Ingeniería Civil Informática', 'Regular', 'Vigente');

  -- 4. INSERTAR ASIGNATURAS (Depende de Jefatura)
  INSERT INTO asignaturas (nombre_asignatura, departamento, cantidad_estudiantes, coordinador_id, jefatura_id) VALUES
  ('Estructuras de Datos', 'Informática', 40, 1, 4),
  ('Programación de Software', 'Informática', 60, 6, 4),
  ('Bases de Datos', 'Informática', 50, 1, 4),
  ('Ingeniería de Software', 'Informática', 30, 2, 4),
  ('Arquitectura de Computadores', 'Informática', 45, 1, 4),
  ('Matemática 1', 'Matemática', 200, 7, 21),
  ('Matemática 2', 'Matemática', 150, 7, 21),
  ('Física General 1', 'Física', 200, 8, 22),
  ('Física General 2', 'Física', 150, 17, 22),
  ('Programación', 'Informática', 150, 16, 23),
  ('Estructuras Discretas', 'Informática', 50, 10, 23),
  ('Análisis y Diseño de Software', 'Informática', 50, 13, 23),
  ('Sistemas Operativos', 'Informática', 65, 12, 23),
  ('Redes de Computadores', 'Informática', 50, 10, 23),
  ('Inteligencia Artificial', 'Informática', 65, 20, 23);

  -- 5. RELACIÓN MUCHOS A MUCHOS: ASIGNATURA_DOCENTE
  INSERT INTO asignatura_docente (asignatura_id, docente_id) VALUES
  (1, 1), -- Roberto en Estructuras de Datos (Roberto coordinador)
  (2, 2), -- Ada en Programación de Software (Alan coordinador)
  (3, 1), -- Roberto en Bases de Datos (Roberto coordinador)
  (3, 2), -- Ada en Bases de Datos
  (4, 2), -- Ada en Ingeniería de Software (Ada coordinador)
  (5, 1), -- Roberto en Arquitectura de Computadores (Roberto coordinador)
  (6, 7), -- Gauss en Matemática 1 (Gauss coordinador)
  (6, 14), -- John von en Matemática 1 
  (7, 7), -- Gauss en Matemática 2 (Gauss coordinador)
  (8, 8), -- Newton en Física General 1 (Newton coordinador)
  (9, 17), -- Richard en Física General 2 (Richard coordinador)
  (10, 16), -- Grace en Programación (Grace coordinador)
  (10, 11), -- Donald en Programación 
  (11, 10), -- Claude en Estructuras Discretas (Claude coordinador)
  (12, 13), -- Barbara en Análisis y Diseño de Software (Barbara coordinador)
  (13, 12), -- Dijkstra en Sistemas Operativos (Dijkstra coordinador)
  (14, 10), -- Claude en Redes de Computadores (Claude coordinador)
  (15, 20); -- Linus en Inteligencia Artificial (Linus coordinador)

  -- 6. INSERTAR AYUDANTÍAS (Vacantes)
  INSERT INTO ayudantia (tipo_ayudantia, cantidad_cupos, carga_horaria, requisitos, asignatura_id, docente_id) VALUES
  ('Laboratorio', 2, 6, 'Haber aprobado con nota > 80 y manejo de C++', 1, 1),
  ('Cátedra', 1, 4, 'Promedio general > 75', 2, 2),
  ('Corrección', 3, 4, 'Aprobar Bases de Datos con > 70', 3, 1),
  ('Laboratorio', 2, 6, 'Conocimientos de Docker y Node', 4, 2),
  ('Cátedra', 1, 4, 'Aprobación de Arquitectura', 5, 1),
  ('Cátedra', 8, 4, 'Promedio superior a 65', 6, 7),
  ('Corrección', 6, 2, 'Haber aprobado con nota > 75', 6, 14),
  ('Cátedra', 5, 4, 'Promedio superior a 70', 7, 7),
  ('Laboratorio', 10, 6, 'Aprobación de Física General 1', 8, 8),
  ('Laboratorio', 8, 6, 'Aprobación de Física General 2', 9, 17),
  ('Laboratorio', 12, 8, 'Haber aprobado con nota > 80', 10, 16),
  ('Corrección', 6, 4, 'Promedio general > 65 y haber aprobado la asignatura', 10, 11),
  ('Cátedra', 4, 4, 'Aprobación de Programación', 11, 10),
  ('Laboratorio', 4, 6, 'Haber aprobado con nota > 65', 13, 12),
  ('Laboratorio', 5, 6, 'Haber aprobado con nota > 70', 14, 10);

  -- 7. INSERTAR POSTULACIONES
  INSERT INTO postulaciones (estado_actual, ayudantia_id, estudiante_id, jefatura_id) VALUES
  ('En Revisión', 1, 3, 4),
  ('Aceptada', 2, 5, 4),
  ('Aceptada', 3, 3, 4),
  ('Rechazada', 5, 3, 4),
  ('En Revisión', 6, 24, 23),
  ('Aceptada', 7, 24, 23),
  ('En Revisión', 8, 25, 22),
  ('Rechazada', 9, 25, 22),
  ('Aceptada', 10, 26, 21),
  ('En Revisión', 11, 26, 23),
  ('Aceptada', 12, 27, 23),
  ('En Revisión', 13, 27, 23),
  ('Rechazada', 14, 28, 23),
  ('En Revisión', 15, 28, 23),
  ('Aceptada', 13, 29, 23),
  ('En Revisión', 15, 29, 23),
  ('En Revisión', 10, 30, 23),
  ('Rechazada', 7, 30, 21),
  ('Aceptada', 12, 31, 23),
  ('En Revisión', 15, 31, 23);

  -- 8. AVANCE CURRICULAR
  INSERT INTO avance_curricular (estudiante_id, asignatura_id, nota) VALUES
  (3, 1, 80),
  (3, 2, 60),
  (3, 4, 95),
  (5, 1, 55),
  (5, 3, 70),
  (24, 6, 88),
  (24, 7, 82),
  (24, 10, 91),
  (24, 11, 85),
  (25, 6, 70),
  (25, 8, 78),
  (25, 10, 83),
  (26, 6, 95),
  (26, 7, 89),
  (26, 1, 92),
  (27, 10, 76),
  (27, 11, 81),
  (27, 12, 74),
  (28, 8, 87),
  (28, 9, 79),
  (29, 10, 90),
  (29, 11, 88),
  (29, 13, 84),
  (30, 6, 73),
  (30, 7, 77),
  (30, 2, 69),
  (31, 10, 94),
  (31, 12, 90),
  (31, 15, 86);
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
