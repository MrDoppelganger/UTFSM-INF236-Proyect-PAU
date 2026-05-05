import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Esto es vital para Docker: expone el servidor a la red del contenedor (0.0.0.0)
    port: 3000, // Fuerza a Vite a usar el puerto 3000 que configuramos en docker-compose
    watch: {
      usePolling: true // Asegura que los cambios de código se reflejen en vivo (Hot Reload) en Linux/Docker
    },
    // --- NUEVO: CONFIGURACIÓN DEL PROXY ---
    proxy: {
      '/api': {
        target: 'http://server:5000', // Apunta al nombre del contenedor del backend en Docker
        changeOrigin: true,
        // Tu index.js tiene las rutas "/messages" y "/save" (sin "api").
        // Esta línea toma cualquier petición que empiece con "/api" y le borra el "/api" antes de enviarla a Node.
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})