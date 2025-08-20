# Usa una imagen base con Node.js 18
FROM node:18-alpine

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo de bloqueo y el package.json antes de copiar el resto de los archivos
COPY pnpm-lock.yaml .
COPY package.json .

# Instala pnpm
RUN npm install -g pnpm

# Instala las dependencias usando el archivo de bloqueo
RUN pnpm install --frozen-lockfile

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación
RUN pnpm run build

# Verifica que el directorio dist existe
RUN ls -la dist

# Instala el servidor 'serve' globalmente
RUN npm install -g serve

# Configura el servidor para servir la aplicación desde la carpeta dist y manejar las rutas de una SPA
CMD ["serve", "-s", "dist", "-l", "3000"]

# Expone el puerto
EXPOSE 3000
