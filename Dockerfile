# Build React
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

ARG REACT_APP_URL
ENV REACT_APP_URL=$REACT_APP_URL

RUN npm run build

# Pas besoin de Nginx dans cette image
