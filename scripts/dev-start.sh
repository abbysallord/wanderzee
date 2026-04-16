#!/bin/bash
echo "🚀 Starting WanderZee Development Environment..."

# Start infrastructure
echo "📦 Starting Docker services (PostgreSQL, Redis)..."
docker-compose up -d

# Wait for DB
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Start backend
echo "🖥️ Starting API server..."
cd apps/api
npm run start:dev &
API_PID=$!
cd ../..

# Start Flutter web (or run on device)
echo "📱 Starting Flutter app..."
cd apps/mobile
flutter run -d chrome &
FLUTTER_PID=$!
cd ../..

echo ""
echo "✅ WanderZee is running!"
echo "   API: http://localhost:3000"
echo "   App: http://localhost:8080 (or on device)"
echo ""
echo "Press Ctrl+C to stop all services"

trap "kill $API_PID $FLUTTER_PID 2>/dev/null; docker-compose down; exit" SIGINT SIGTERM
wait
