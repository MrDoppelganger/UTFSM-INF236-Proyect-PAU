//-------------------Librerias--------------------
const express = require('express');
const router = express.Router();
const { 
  obtenerEstudiantePorId, 
  obtenerPostulacionesEstudiante, 
  obtenerAvanceCurricular 
} = require('../controllers/estudiantesController');

//------------------Rutas-------------------------
/*
    Ruta: GET /api/estudiantes/:id
    Descripción: Obtiene la información de un estudiante.
*/
router.get('/:id', obtenerEstudiantePorId);

/*
    Ruta: GET /api/estudiantes/:id/postulaciones
    Descripción: Obtiene las postulaciones de un estudiante.
*/
router.get('/:id/postulaciones', obtenerPostulacionesEstudiante);

/*
    Ruta: GET /api/estudiantes/:id/avance
    Descripción: Obtiene el avance curricular de un estudiante.
*/
router.get('/:id/avance', obtenerAvanceCurricular);

module.exports = router;
