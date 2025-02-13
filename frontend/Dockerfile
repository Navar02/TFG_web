# Usa una imagen de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instala las dependencias
RUN npm install --verbose

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto 8080 (puede variar dependiendo de tu configuración)
EXPOSE 8080

# Ejecuta el servidor de Vue
CMD ["npm", "run", "serve"]