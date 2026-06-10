//-------------------Librerias--------------------
const express = require('express');
const router = express.Router();
const { obtenerAyudantias } = require('../controllers/ayudantiasController');

//------------------Rutas-------------------------
/*
    Ruta: GET /api/ayudantias
    Descripción: Obtiene todas las vacantes de ayudantías formateadas.
*/
router.get('/', obtenerAyudantias);

module.exports = router;
