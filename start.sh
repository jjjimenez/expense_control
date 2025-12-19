#!/bin/bash

# Expense Control - Startup Script
echo "🚀 Starting Expense Control Application..."

# Check if MySQL/MariaDB is running
if ! pgrep -x "mariadbd" > /dev/null; then
    echo "📊 Starting MariaDB..."
    service mariadb start
    sleep 2
fi

# Start backend
echo "🔧 Starting backend server..."
cd backend
npm start > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ..

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 5

# Check if backend is running
if curl -s http://localhost:12000/api/health > /dev/null; then
    echo "✅ Backend is running on http://localhost:12000"
else
    echo "❌ Backend failed to start"
    exit 1
fi

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend
npm start > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"
cd ..

# Wait for frontend to start
echo "⏳ Waiting for frontend to initialize..."
sleep 10

# Check if frontend is running
if curl -s http://localhost:12001 > /dev/null; then
    echo "✅ Frontend is running on http://localhost:12001"
else
    echo "❌ Frontend failed to start"
    exit 1
fi

echo ""
echo "🎉 Expense Control Application is now running!"
echo ""
echo "📱 Frontend: http://localhost:12001"
echo "🔧 Backend API: http://localhost:12000"
echo ""
echo "👤 Test Accounts:"
echo "   Admin: username=admin, password=admin123"
echo "   User:  username=user1, password=user123"
echo ""
echo "📋 Process IDs:"
echo "   Backend: $BACKEND_PID"
echo "   Frontend: $FRONTEND_PID"
echo ""
echo "🛑 To stop the application, run: ./stop.sh"
echo ""

# Save PIDs for stop script
echo "$BACKEND_PID" > .backend.pid
echo "$FRONTEND_PID" > .frontend.pid