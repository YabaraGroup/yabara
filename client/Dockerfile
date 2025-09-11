# -------- Build --------
FROM node:22-alpine AS builder
WORKDIR /app

# Copie package.json + lockfile global
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY client/package.json ./client/package.json

RUN npm install --no-audit --no-fund --workspace=client

# Copie le code du client
COPY client/ ./client

RUN npm run build --workspace=client

# -------- Runtime --------
FROM nginx:alpine
COPY --from=builder /app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
