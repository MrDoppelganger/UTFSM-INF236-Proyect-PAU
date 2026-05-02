FROM node:22-alpine

WORKDIR /app

# Copiar dependencias primero
COPY package*.json ./

# Usamos npm install normal para entorno de desarrollo
RUN npm install

# Copiar el resto del código de React
COPY . .

# Exponer el puerto que usará React
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "dev"]