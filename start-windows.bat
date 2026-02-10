@echo off
title Presentation Deck - Launcher
cd /d "%~dp0"

echo ================================================
echo       Presentation Deck - Start Script         
echo ================================================
echo This script will check your environment, install
echo dependencies if needed, and start the server.
echo ------------------------------------------------

:: 1. Check for Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed.
    echo Please download and install it from: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node -v') do set NODE_VER=%%i
echo ✅ Node.js detected: %NODE_VER%

:: 2. Determine Package Manager
set PKG_MANAGER=npm
where pnpm >nul 2>nul
if not errorlevel 1 (
    set PKG_MANAGER=pnpm
) else (
    where yarn >nul 2>nul
    if not errorlevel 1 (
        set PKG_MANAGER=yarn
    )
)
echo ℹ️ Using %PKG_MANAGER% as package manager.

:: 3. Handle Dependency Installation
if not exist "node_modules\" (
    echo 📦 node_modules not found. Installing dependencies...
    call %PKG_MANAGER% install
    if errorlevel 1 (
        echo ❌ Error: Dependency installation failed.
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully.
) else (
    echo ✅ node_modules found. Skipping installation.
)

:: 4. Start Server
echo ------------------------------------------------
echo 🚀 Starting presentation server...
echo Once the server is ready, your browser will open.
echo Press Ctrl+C to stop the server when you are finished.
echo ------------------------------------------------

:: Open browser after a small delay
start "" "http://localhost:4000"

:: Run dev server
call %PKG_MANAGER% run dev

pause
