#!/bin/bash
# Move to the directory where the script is located
cd "$(dirname "$0")"

echo "------------------------------------------------"
echo "   Wildholz Pitch Deck - Start Script (Mac)     "
echo "------------------------------------------------"

has_cmd() { command -v "$1" >/dev/null 2>&1; }

if ! has_cmd node; then
    echo "Node.js is not installed. Please install it first: https://nodejs.org/"
    exit 1
fi

# Check if node_modules exists, if not, install
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies... (this may take a minute)"
    npm install --no-audit --no-fund
fi

echo "Starting presentation server..."
echo "Once the server is ready, the presentation will open in your browser."
echo "Press Ctrl+C to stop the server when you are finished."

# Open browser after a small delay to give the server time to start
(sleep 3 && open http://localhost:4000) &

# Run dev server
npm run dev
