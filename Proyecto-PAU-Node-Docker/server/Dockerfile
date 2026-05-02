FROM node:22-alpine

WORKDIR /app

# Copiar dependencias primero (optimiza la caché de Docker)
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del servidor
EXPOSE 5000

# Instalar wait-port globalmente
RUN npm install -g wait-port

# Comando para esperar a PostgreSQL y luego iniciar
CMD ["sh", "-c", "wait-port postgres_db:5432 && npm start"]