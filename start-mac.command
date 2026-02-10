#!/bin/bash
# Move to the directory where the script is located
cd "$(dirname "$0")"

echo "================================================"
echo "      Presentation Deck - Start Script         "
echo "================================================"
echo "This script will check your environment, install"
echo "dependencies if needed, and start the server."
echo "------------------------------------------------"

has_cmd() { command -v "$1" >/dev/null 2>&1; }

# 1. Check for Node.js
if ! has_cmd node; then
    echo "❌ Error: Node.js is not installed."
    echo "Please download and install it from: https://nodejs.org/"
    read -p "Press Enter to exit..."
    exit 1
fi
echo "✅ Node.js detected: $(node -v)"

# 2. Determine Package Manager
PKG_MANAGER="npm"
if has_cmd pnpm; then
    PKG_MANAGER="pnpm"
elif has_cmd yarn; then
    PKG_MANAGER="yarn"
fi
echo "ℹ️ Using $PKG_MANAGER as package manager."

# 3. Handle Dependency Installation
if [ ! -d "node_modules" ] || [ "$1" == "--reinstall" ]; then
    if [ "$1" == "--reinstall" ]; then
        echo "🔄 Reinstalling dependencies as requested..."
        rm -rf node_modules
    else
        echo "📦 node_modules not found. Installing dependencies..."
    fi
    
    $PKG_MANAGER install
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully."
    else
        echo "❌ Error: Dependency installation failed."
        read -p "Press Enter to exit..."
        exit 1
    fi
else
    echo "✅ node_modules found. Skipping installation."
    echo "💡 Tip: Run with --reinstall if you encounter issues."
fi

# 4. Start Server
echo "------------------------------------------------"
echo "🚀 Starting presentation server..."
echo "Once the server is ready, your browser will open."
echo "Press Ctrl+C to stop the server when you are finished."
echo "------------------------------------------------"

# Open browser after a small delay
(sleep 4 && open http://localhost:4000) &

# Run dev server
$PKG_MANAGER run dev
