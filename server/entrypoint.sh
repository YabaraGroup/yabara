#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."
until nc -z -v -w30 "$DB_HOST" "$DB_PORT"
do
  echo "Waiting for database connection..."
  sleep 5
done

echo "🚀 Running migrations..."
if [ "$NODE_ENV" = "production" ]; then
  npm run db:migrate:prod --workspace=server
else
  npm run db:migrate:dev --workspace=server
fi

echo "✅ Starting server..."
exec node dist/server.js
