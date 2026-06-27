//-------------------Librerias--------------------
const pool = require('../config/db');

//------------------Controladores-------------------
/*
    ------------Funcion-----------------
    crearPostulacion: 
        Inserta una nueva postulación en la base de datos para un 
        estudiante y una ayudantía específica. Calcula automáticamente 
        la jefatura correspondiente.
    ------------Parametros----------------
    req: Objeto Request de Express.
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con la postulación creada o un mensaje de error.
    ----------------------------------
*/
const crearPostulacion = async (req, res) => {
  try {
    const idAyudantia = req.body.ayudantia_id;
    const idEstudiante = req.body.estudiante_id;

    // Validación básica de parámetros
    if (!idAyudantia || !idEstudiante) {
      return res.status(400).json({ error: 'Faltan parámetros obligatorios: ayudantia_id o estudiante_id' });
    }

    // Consulta SQL directa y simplificada
    const consulta = `
      INSERT INTO postulaciones (estado_actual, ayudantia_id, estudiante_id, jefatura_id)
      VALUES ('En Revisión', $1, $2, 4);
    `;

    // Ejecutamos la inserción (sin RETURNING)
    await pool.query(consulta, [idAyudantia, idEstudiante]);
    
    // Respondemos solo con un mensaje de éxito y código 201 (Created)
    res.status(201).json({ mensaje: 'Postulación creada con éxito' }); 

  } catch (error) {
    console.error("Error al crear la postulación:", error);
    res.status(500).json({ error: 'Error interno del servidor al procesar la postulación.' });
  }
};

module.exports = {
  crearPostulacion
};