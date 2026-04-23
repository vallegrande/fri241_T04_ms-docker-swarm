FROM node:18-alpine AS build
WORKDIR /app

# Copiamos solo los archivos de configuración primero
COPY package*.json ./

# Instalamos las dependencias y forzamos que Vite esté disponible
RUN npm install
RUN npm install -g vite 

# Ahora copiamos el resto del código
COPY . .

# Ejecutamos el build usando el binario global para evitar el "not found"
RUN vite build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]