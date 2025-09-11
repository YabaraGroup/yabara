# Étape 1: build front
FROM node:22-alpine AS builder
WORKDIR /app

# Copie package.json du client + lock de la racine
COPY client/package.json ./package.json
COPY package-lock.json ../package-lock.json

RUN npm install --no-audit --no-fund
COPY client/ .
RUN npm run build

# Étape 2: servir avec nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
