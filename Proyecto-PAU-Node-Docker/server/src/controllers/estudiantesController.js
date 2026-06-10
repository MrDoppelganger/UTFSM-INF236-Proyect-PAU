//-------------------Librerias--------------------
const pool = require('../config/db');

//------------------Controladores-------------------
/*
    ------------Funcion-----------------
    obtenerEstudiantePorId: 
        Obtiene la informacion basica de un estudiante 
        mediante su ID.
    ------------Parametros----------------
    req: Objeto Request de Express (contiene req.params.id).
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con los datos del estudiante o error 404.
    ----------------------------------
*/
const obtenerEstudiantePorId = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `
      SELECT u.id, u.nombre, u.correo, e.carrera, e.situacion_academica, e.estado_curso_eaa 
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
};

/*
    ------------Funcion-----------------
    obtenerPostulacionesEstudiante: 
        Obtiene todas las postulaciones activas e historicas 
        de un estudiante.
    ------------Parametros----------------
    req: Objeto Request de Express (contiene req.params.id).
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con el arreglo de postulaciones.
    ----------------------------------
*/
const obtenerPostulacionesEstudiante = async (req, res) => {
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
        asig.cantidad_estudiantes,
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
};

/*
    ------------Funcion-----------------
    obtenerAvanceCurricular: 
        Obtiene el avance curricular de un estudiante, 
        listando sus notas y asignaturas.
    ------------Parametros----------------
    req: Objeto Request de Express (contiene req.params.id).
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con el arreglo del avance curricular.
    ----------------------------------
*/
const obtenerAvanceCurricular = async (req, res) => {
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
};

module.exports = {
  obtenerEstudiantePorId,
  obtenerPostulacionesEstudiante,
  obtenerAvanceCurricular
};
