# Proyecto PAU: Experiencia de postulación

> **Universidad:** Universidad Técnica Federico Santa María (UTFSM)  
> **Curso:** Análisis y diseño de Software(INF236) — 1° Semestre/2026  
> **Grupo:** 9
>
> **Integrantes:**
> * Vicente Rodríguez Rogers        | 202273503-1 
> * Victoria Andrea Medina Castro   | 202373586-8 
> * Gabriel Alejandro Toro Varela   | 202204557-4
> * Javier Alonso Gana Muñoz        | 202373540-k       
>
> **Tutor:** Matias Barrera

---

Este es el README principal. Aquí se encuentra toda la documentación general, el código fuente 
y las instrucciones necesarias para levantar el entorno completo de la aplicación. La aplicación 
está completamente dockerizada para garantizar su portabilidad.

## Wiki

### <u> **Acceso a la pagina:** </u> [HOME](https://gitlab.inf.utfsm.cl/inf236-2026-1/inf236-sj-09/-/wikis/home)

## Servicios de la Aplicación

Nuestra aplicación está construida sobre una arquitectura moderna basada en microservicios, compuesta por las 
siguientes tecnologías principales:

*   **Frontend (Cliente):** Desarrollado con **React** y empaquetado con **Vite**. Utiliza **Tailwind CSS** 
para un diseño moderno, estético y responsivo. Se encarga de la interfaz gráfica y la interacción con el 
usuario final.
*   **Backend (Servidor):** Construido con **Node.js** y **Express**. Se encarga de la lógica de negocio, 
manejo de peticiones de la API REST y conexión con la base de datos. Está estructurado bajo el patrón de 
diseño MVC (Modelo-Vista-Controlador).
*   **Base de Datos:** Se utiliza **PostgreSQL** como base de datos relacional para el almacenamiento seguro y
 estructurado de la información del sistema.

Todos estos servicios están orquestados de manera conjunta mediante **Docker Compose**, lo que permite levantar
 el proyecto completo de manera rápida y sin problemas de compatibilidad en diferentes sistemas operativos.

## Aspectos Tecnicos

### <u>**Estructura del repositorio** </u>

```bash
├── Docs/                                   # Documentos e ideas del proyecto.
│   └── Evidencia.ipynb                     # Evidencia del levantamiento del proyecto.
├── Proyecto-PAU-Node-Docker/               # Proyecto Dockerizado.
│   ├── client/                             # Front-end (React, Vite, Tailwind CSS).
│   ├── server/                             # Back-end (Node.js, Express, PostgreSQL).
│   └── docker-compose.yml                  # Docker Compose que conecta ambas partes y la BD.
├── .gitignore
└── README.md                               
```

### <u> **Levantamiento**: </u>
*   Se recomienda asegurar que no se posee nada en los puertos ***3000*** y ***5000*** de localhost.
*   Se debe ingresar a la carpeta ***/Proyecto-PAU-Node-Docker***.
*   Al abrir una terminal dentro de este entorno se ejecuta el comando: ***docker compose up --build***.
*   Para visualizar la pagina como se desea, se deben crear las tablas de la base de datos e instalar su 
mock data tal cual se muestra en el README ubicado en la carpeta ***server/***
*   Se accede a la aplicación desde ***http://localhost:3000/***

## 📷 Video de prototipo

* Enlace al video demostrativo del prototipo: [video](https://youtu.be/CzRukkanIzE)

### <u> **Consideraciones**: </u>
*   Se reorganizó el repositorio con el formato client-server, separando la sección del front-end con la 
del back-end para tener un proyecto más profesional y ordenado. Por esta misma razón se realizaron las 
modificaciones pertinentes para que el levantamiento del docker considere estos cambios.
*   El front-end (client/React) fue creado a partir de **Vite**.
*   Se actualizó el node a una versión más actual, pasando de la 18 a la 22.
*   Se eligió no sobrecargar el repositorio subiendo los node_modules, los cuales se descargaran 
automáticamente al levantar el contenedor de Docker.
*   Se utilizó el framework **Tailwind CSS** para react, para así tener un front-end más pulido y moderno.
*   En caso de que existan problemas al levantar el docker por corrupción de archivos (debido a usar el 
node_modules local o interrupciones previas), se recomienda detenerlo con ***docker compose down -v***, ejecutar
 ***docker compose build --no-cache***, y finalmente ejecutar ***docker compose up -d***.

