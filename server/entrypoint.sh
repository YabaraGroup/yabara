#!/bin/sh
set -e

echo "⏳ Waiting for MySQL..."
until nc -z -v -w30 "$DB_HOST" "$DB_PORT"
do
  echo "Waiting for database connection..."
  sleep 5
done

echo "🚀 Running migrations..."
if npm run db:migrate --workspace=server; then
  echo "✅ Migrations done"
else
  echo "⚠️ Migration failed, but starting server anyway"
fi

echo "🌱 Running seed..."
if npm run db:seed --workspace=server; then
  echo "✅ Seed done"
else
  echo "⚠️ Seed failed, but starting server anyway"
fi

echo "✅ Starting server..."
exec node dist/server.js
