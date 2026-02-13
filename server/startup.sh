#!/bin/sh
set -e

echo "=========================================="
echo "🚀 Starting E-commerce Application..."
echo "=========================================="

echo "📦 Running database migrations..."
npx prisma migrate deploy

echo "🌱 Seeding database with products..."
node seed.js 2>&1 || true

echo "=========================================="
echo "✅ Startup preparation complete!"
echo "=========================================="
echo "🎯 Starting application..."
node app.js
