# Cliente

Este directorio contiene el código fuente del frontend de la aplicación. aqui se hubica 
todo el contenido del REACT y sus herramientas que nos permiten este frontend mas pulido.

---

### <u>Estructura</u>:

```bash
├── client/
│   ├── node_modules/                   # Dependencias instaladas (ignoradas en el git, se instalan sola).
│   ├── public/                         # Archivos estáticos accesibles públicamente.
│   ├── src/                            # Código principal del frontend.
│   │   ├── assets/                     # Imágenes, íconos y otros recursos (hero.png, vite.svg).
│   │   ├── components/                 # Componentes reutilizables de React (AyudantiaCard, Modal, Sidebar, etc).
│   │   ├── context/                    # Contextos globales de React (ThemeContext para el modo oscuro).
│   │   ├── pages/                      # Vistas principales de la aplicación.
│   │   │   └── Dashboard.jsx           # Vista principal de la pagina
│   │   ├── App.jsx                     # Componente raíz que define la estructura principal.
│   │   ├── App.css                     # Carga los estilos de la pagina
│   │   ├── main.jsx                    # Punto de entrada y montaje de React.
│   │   └── index.css                   # Archivo principal de Tailwind y estilos base globales.
│   ├── Dockerfile                      # Configuración de la imagen Docker para el frontend.
│   ├── index.html                      # Plantilla HTML inicial donde se inyecta Vite y React.
│   ├── eslint.config.js                # Configuración del linter (ESLint).
│   ├── package-lock.json               # Árbol de versiones de dependencias bloqueadas.
│   ├── package.json                    # Dependencias del frontend y scripts npm.
│   ├── vite.config.js                  # Configuración del servidor de desarrollo y bundler de Vite.                       
│   └── README.md
```

---

### <u>Herramientas Instaladas e Infraestructura</u>:

Para garantizar una experiencia de desarrollo moderna y ágil, utilizamos las siguientes herramientas a partir
de la libreria principal de REACT:

*   **Vite:** Se utiliza como empaquetador principal (bundler) y servidor de desarrollo. Fue elegido por encima 
de "Create React App" debido a su extrema velocidad de construcción y a su servidor de desarrollo instantáneo 
utilizando *Hot Module Replacement (HMR)*.
*   **Tailwind CSS:** Framework de CSS orientado a utilidades. Se instaló para construir una interfaz moderna, 
limpia y responsive sin la necesidad de escribir y mantener archivos CSS gigantes. Permite aplicar estilos 
directamente en las clases de los componentes React.
*   **ESLint:** Herramienta para analizar de forma estática el código JavaScript y React. Se configuró para m
antener un estilo de codificación consistente y detectar posibles errores o malas prácticas antes de siquiera 
ejecutar el código.

