# Server
Este directorio contiene el código fuente y las dependencias del backend de la aplicación. 
Está construido con Node.js y Express, siguiendo un patrón MVC (Modelo-Vista-Controlador), y se encarga 
de manejar la API REST y la conexión a la base de datos PostgreSQL.

---

### <u>Estructura</u>:

```bash
├── server/
│   ├── node_modules/                       # Dependencias instaladas (ignoradas en Git).
│   ├── src/                                # Código principal del backend.
│   │   ├── config/                         # Configuración de servicios externos.
│   │   │   └── db.js                       # Conexión con PostgreSQL.
│   │   ├── controllers/                    # Controladores (Lógica de los endpoints).
│   │   │   ├── ayudantiasController.js     # Lógica de ayudantías.
│   │   │   ├── estudiantesController.js    # Lógica de estudiantes.
│   │   │   └── testController.js           # Lógica para rutas de prueba.
│   │   ├── routes/                         # Definición de rutas (Endpoints).
│   │   │   ├── ayudantiasRoutes.js         # Endpoints de ayudantías.
│   │   │   ├── estudiantesRoutes.js        # Endpoints de estudiantes.
│   │   │   └── testRoutes.js               # Endpoints de prueba.
│   │   ├── scripts/                        # Scripts utilitarios de la base de datos.
│   │   │   ├── initDB.js                   # Creación inicial de las tablas.
│   │   │   └── mockData.js                 # Inserción de datos de ejemplo (Mock Data).
│   │   └── index.js                        # Punto de entrada de la aplicación Express.
│   ├── Dockerfile                          # Configuración de la imagen Docker del backend.
│   ├── package-lock.json                   # Árbol de dependencias bloqueadas.
│   ├── package.json                        # Definición de paquetes npm y dependencias.
│   └── README.md                           # Este documento.
```

---

### <u>Config inicial</u>
*   Para subir las tablas a la base de datos se necesita ejecutar el script ***src/scripts/initDB.js*** utilizando el siguiente comando dentro de la terminal, ubicados en la carpeta ***Proyecto-PAU-Node-Docker/***:    
```bash
docker exec -it proyecto-pau-node-docker-server-1 node src/scripts/initDB.js
```

*   Con las tablas creadas, podemos insertar Mock Data para visualizar ciertos datos de ejemplo en la página. Para ello aplicamos los mismos pasos pero ejecutando el script ***src/scripts/mockData.js***:    
```bash
docker exec -it proyecto-pau-node-docker-server-1 node src/scripts/mockData.js
```

---

### <u>Consideraciones</u>:
*   Es importante cargar las tablas y la mock data al levantar el entorno por primera vez para asegurar el correcto funcionamiento de los endpoints y tener la experiencia visual deseada en el front-end.
*   El servidor se expone en el puerto local 5000 y se comunica con el contenedor de la base de datos a través de la red interna de Docker Compose.
