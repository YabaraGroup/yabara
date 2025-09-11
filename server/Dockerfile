# server/Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app

# Copie package.json du server + lockfile global
COPY server/package.json ./package.json
COPY package-lock.json ./package-lock.json

RUN npm install --no-audit --no-fund

# Copie le code du server
COPY server/ .

RUN npm run build

# ---- Runtime ----
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY server/package.json ./package.json
COPY package-lock.json ./package-lock.json
RUN npm install --omit=dev --no-audit --no-fund

COPY --from=builder /app/dist ./dist

EXPOSE 3310
CMD ["node", "dist/server.js"]
