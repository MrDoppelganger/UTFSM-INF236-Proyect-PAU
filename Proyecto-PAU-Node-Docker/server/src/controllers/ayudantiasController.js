//-------------------Librerias--------------------
const pool = require('../config/db');

//------------------Controladores-------------------
/*
    ------------Funcion-----------------
    obtenerAyudantias: 
        Obtiene las vacantes de ayudantías formateadas 
        para ser mostradas en las Tarjetas (Cards).
        Usa JOIN para cruzar tablas y armar la información completa.
    ------------Parametros----------------
    req: Objeto Request de Express.
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con las ayudantías al cliente.
    ----------------------------------
*/
const obtenerAyudantias = async (req, res) => {
  try {
    const query = `
      SELECT 
        ay.id,
        ay.tipo_ayudantia,
        ay.cantidad_cupos,
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
};

module.exports = {
  obtenerAyudantias
};
