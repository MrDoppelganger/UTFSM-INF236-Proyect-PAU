//-------------------Librerias--------------------
const express = require('express');
const router = express.Router();
const { crearPostulacion } = require('../controllers/postulacionesController');

//------------------Rutas-------------------------
/*
    Ruta: POST /api/postulaciones
    Descripción: Crea una nueva postulación para un estudiante.
*/
router.post('/', crearPostulacion);

module.exports = router;
