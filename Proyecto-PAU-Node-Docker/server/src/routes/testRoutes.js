//-------------------Librerias--------------------
const express = require('express');
const router = express.Router();
const { 
  guardarMensajePrueba, 
  obtenerMensajesPrueba, 
  obtenerTestUsuarios 
} = require('../controllers/testController');

//------------------Rutas-------------------------
/*
    Ruta: GET /test/save
    Descripción: Guarda un mensaje de prueba.
*/
router.get('/save', guardarMensajePrueba);

/*
    Ruta: GET /test/messages
    Descripción: Lee los mensajes de prueba.
*/
router.get('/messages', obtenerMensajesPrueba);

/*
    Ruta: GET /test/usuarios
    Descripción: Lee usuarios sin formatear para pruebas.
*/
router.get('/usuarios', obtenerTestUsuarios);

module.exports = router;
