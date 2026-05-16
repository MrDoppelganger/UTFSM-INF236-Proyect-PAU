# Cliente

### <u>Estructura</u>:

```bash
├──client/
    ├── node_modules                    #Extensiones del front-end (no se sube al repo)  
    ├── public/                         #Archivos estaticos.
    ├── src/                            #componentes visuales.
        ├── assets/
        ├── components/
        ├── context/
        ├── pages/
            └── Dashboard.jsx
        ├── App.css
        ├── App.jsx
        ├── index.css
        └── main.jsx    
    ├── Dockerfile                      #Config del docker para el Front.
    ├── index.html                      #Punto inicial del React y vite                      
    ├── package-lock.json
    ├── package.json                    #Dependencias del front-end
    ├── README.md                   
    └── vite.config.js                  #Config del servidor
```
### <u> Consideraciones</u>:

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
