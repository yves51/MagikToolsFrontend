# Build React
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Variable d'environnement pour l'API
ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

RUN npm run build

# Nginx pour servir React
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ../nginx.prod.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
