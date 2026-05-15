# Server

### <u>Estructura</u>:

```bash
├──server/
    ├── node_modules                    #Extensiones del back-end (no se sube al repo)  
    ├── src/                            #Cosas de node (controladores y cosas).  
        ├── db.js                       #Config de la base de datos
        ├── index.js                    #Querys
        ├── mockData.js                 #Datos de ejemplos
        └── setupDB.js                  #Tablas de la base de datos
    ├── Dockerfile                      #Config del docker para el back.
    ├── package-lock.json
    ├── package.json                    #Dependencias del backend
    └── README.md
```
### <u>Config inicial</u>
*   Para subir las tablas a la base de datos se necesita cargar el documento ***src/setupDB.js*** utilizando el siguiente comando dentro de la terminal de ***Proyecto-PAU-Node-Docker/***:    
```docker exec -it proyecto-pau-node-docker-server-1 node src/setupDB.js ```

*   Con las tablas cargadas, Podemos meter Mock data para poder visualizar ciertos datos de ejemplo en la pagina, para eso aplicamos los mismos pasos pero cargando el documento ***mockData.js*** dentro de a terminal de ***proyecto-PAU-Node-Docker/***:    
``` docker exec -it proyecto-pau-node-docker-server-1 node src/mockData.js ```

### <u>Consideraciones</u>:
*   Es importante Cargar las tablas y la mockdata para tener la experiencia visual deseada.
