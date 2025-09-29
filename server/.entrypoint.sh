#!/bin/sh
set -e

echo "🚀 Running migrations..."
npm run db:migrate --workspace=server

echo "✅ Starting server..."
exec node dist/server.js
