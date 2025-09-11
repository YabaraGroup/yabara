# -------- Build --------
FROM node:22-alpine AS builder
WORKDIR /app

# Copie package.json + lockfile global
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY server/package.json ./server/package.json

RUN npm install --no-audit --no-fund --workspace=server

# Copie le code du server
COPY server/ ./server

RUN npm run build --workspace=server

# -------- Runtime --------
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY server/package.json ./server/package.json

RUN npm install --omit=dev --no-audit --no-fund --workspace=server

COPY --from=builder /app/server/dist ./dist

EXPOSE 3310
CMD ["node", "dist/server.js"]
