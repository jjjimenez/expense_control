#!/bin/bash

# Expense Control - Stop Script
echo "🛑 Stopping Expense Control Application..."

# Stop frontend
if [ -f .frontend.pid ]; then
    FRONTEND_PID=$(cat .frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null; then
        echo "🎨 Stopping frontend (PID: $FRONTEND_PID)..."
        kill $FRONTEND_PID
        rm .frontend.pid
    else
        echo "Frontend process not found"
        rm -f .frontend.pid
    fi
else
    echo "🔍 Searching for frontend process..."
    pkill -f "webpack-dev-server"
fi

# Stop backend
if [ -f .backend.pid ]; then
    BACKEND_PID=$(cat .backend.pid)
    if ps -p $BACKEND_PID > /dev/null; then
        echo "🔧 Stopping backend (PID: $BACKEND_PID)..."
        kill $BACKEND_PID
        rm .backend.pid
    else
        echo "Backend process not found"
        rm -f .backend.pid
    fi
else
    echo "🔍 Searching for backend process..."
    pkill -f "node server.js"
fi

# Clean up any remaining processes
echo "🧹 Cleaning up remaining processes..."
pkill -f "expense-control"

echo "✅ Expense Control Application stopped successfully!"