#!/bin/bash

# 🚀 Production Startup Script for Deepfake Detection App

echo "🚀 Starting Deepfake Detection App in Production Mode"
echo "=================================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please create .env file with:"
    echo "DATABASE_URL=your_postgresql_url"
    echo "REALITY_DEFENDER_API_KEY=your_api_key"
    exit 1
fi

# Check if build exists
if [ ! -d "dist" ]; then
    echo "📦 Building application..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
else
    echo "✅ Build directory found"
fi

# Load environment variables
export $(cat .env | xargs)

# Check required environment variables
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL not set in .env file"
    exit 1
fi

if [ -z "$REALITY_DEFENDER_API_KEY" ]; then
    echo "⚠️  REALITY_DEFENDER_API_KEY not set (app will use mock analysis)"
fi

# Set production environment
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "✅ Environment: $NODE_ENV"
echo "✅ Port: $PORT"
echo "✅ Database: $(echo $DATABASE_URL | sed 's/\/\/.*@/\/\/[HIDDEN]@/g')"
echo "✅ API Key: $(echo $REALITY_DEFENDER_API_KEY | sed 's/.*/[SET]/g')"

echo ""
echo "🚀 Starting server..."
echo "Access your app at: http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

# Start the application
node dist/index.js