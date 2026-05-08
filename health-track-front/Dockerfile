# =========================
# ETAPA 1 -> BUILD ANGULAR
# =========================

# Imagen de Node.js para compilar Angular
FROM node:22-alpine AS build

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json
# para instalar dependencias
COPY package*.json ./

# Instalamos dependencias del proyecto
RUN npm install

# Copiamos todo el proyecto Angular
COPY . .

# Generamos la build de producción
RUN npm run build


# =========================
# ETAPA 2 -> NGINX
# =========================

# Imagen ligera de Nginx para servir la app
FROM nginx:alpine

# Copiamos la build generada de Angular
# al directorio público de Nginx
COPY --from=build /app/dist/health-track-front/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 80

# Arrancamos Nginx en foreground
CMD ["nginx", "-g", "daemon off;"]