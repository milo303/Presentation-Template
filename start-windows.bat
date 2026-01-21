@echo off
title Wildholz Pitch Deck - Launcher
cd /d "%~dp0"

echo ------------------------------------------------
echo    Wildholz Pitch Deck - Start Script (Win)    
echo ------------------------------------------------

:: Check for node_modules
if not exist "node_modules\" (
    echo Installing dependencies... (this may take a minute)
    call npm install
)

echo Starting presentation server...
echo Once the server is ready, the presentation will open in your browser.
echo Press Ctrl+C to stop the server when you are finished.

:: Open browser after a small delay
start "" "http://localhost:3000"

:: Run dev server
call npm run dev

pause
