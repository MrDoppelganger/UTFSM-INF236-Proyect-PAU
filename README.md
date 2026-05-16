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

## Wiki


### <u> **Acceso a la pagina:** </u> [HOME](https://gitlab.inf.utfsm.cl/inf236-2026-1/inf236-sj-09/-/wikis/home)


### <u>**Consideraciones**: </u>  

## Aspectos Tecnicos

### <u>**Estructura del repositorio** </u>

```bash
├── Docs/                                   #Documentos del proyecto.
│   └── Evidencia.ipynb                     #Evidencia del levantamiento del proyecto.
├── Proyecto-Pau-Node-Docker/               #Proyecto dockeriazado.
│   ├── client/                             #Front-end (Con React, vite y Tailwind CSS)
│   ├── server/                             #Back-end (Con Node y postgreSQL)
│   └── docker-compose.yml                  #Docker que conecta ambas carpetas.
├── .gitignore
└── README.md 

```
### <u> **Levantamiento**: </u>
*   Se recomienda asegurar que no see posee nada en los puertos del ***localhost: 3000*** y ***5000*** 
*   Se Debe ingresar estar dentro de la carpeta ***/Proyecto-PAU-Node-Docker***  
*   Al abrir una terminal dentro de este entorno se ejecuta el comnado: ***docker compose up --build***  
*   Se accede desde el ***http://localhost:3000/***
*   Es importante considerar las indicaciones dentro de los README's interiores tambien.

## 📷 Video de prototipo

* Enlace al video demostrativo del protipo: [video](https://youtu.be/CzRukkanIzE)


### <u> **Consideraciones**: </u>
*   Se Reorganizo el repositorio con el formato client-server, separando la seccion del front-end con la del back-end para tener un proyecto mas profesional y ordenado. Por esta misma razon se realizaron las modificaciones pertinentes para que el levantamiento del docker considere estos cambios.
*   El front-end (client/React) fue creado apartir de **vite**.
*   Se actualizo el node a una version mas actual, pasando de la 18 a la 22.
*   Se eligio no sobrecargar el repositorio subiendo los node_modules, que se descargaran automaticamente al levantar el repositorio.
*   Se utilizo el framework **Tailwind CSS** para react, asi tener un front-end mas pulido y moderno.