//-------------------Librerias--------------------
const pool = require('../config/db');

//------------------Controladores-------------------
/*
    ------------Funcion-----------------
    guardarMensajePrueba: 
        Crea la tabla messages si no existe y guarda 
        un mensaje hardcodeado para verificar escritura en BD.
    ------------Parametros----------------
    req: Objeto Request de Express.
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un texto de confirmación.
    ----------------------------------
*/
const guardarMensajePrueba = async (req, res) => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, content TEXT)');
    await pool.query('INSERT INTO messages (content) VALUES ($1)', ['Hola desde PostgreSQL!']);
    res.send('Mensaje guardado en la base de datos');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
};

/*
    ------------Funcion-----------------
    obtenerMensajesPrueba: 
        Lee todos los mensajes de la tabla messages.
    ------------Parametros----------------
    req: Objeto Request de Express.
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con los mensajes.
    ----------------------------------
*/
const obtenerMensajesPrueba = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
};

/*
    ------------Funcion-----------------
    obtenerTestUsuarios: 
        Lee todos los usuarios de la tabla usuarios.
    ------------Parametros----------------
    req: Objeto Request de Express.
    res: Objeto Response de Express.
    --------------Return------------------
    void: Retorna un JSON con los usuarios.
    ----------------------------------
*/
const obtenerTestUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error');
  }
};

module.exports = {
  guardarMensajePrueba,
  obtenerMensajesPrueba,
  obtenerTestUsuarios
};
