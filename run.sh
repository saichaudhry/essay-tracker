#!/bin/bash

echo "Starting Essay Tracker setup..."

# Start backend
echo "Installing backend dependencies..."
cd server
npm install

echo "Starting backend server..."
node server.js &

# Start frontend
cd ../client
echo "Installing frontend dependencies..."
npm install

echo "Starting frontend..."
npm start
