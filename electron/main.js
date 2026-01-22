const { app, BrowserWindow, shell } = require('electron')
const path = require('path')

// CHANGE THIS to your actual live URL once deployed!
const LIVE_URL = 'https://milo303.github.io/wildholz-pitch-deck'

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "Wildholz Pitch Deck",
        icon: path.join(__dirname, '../public/wildholz-logo.png'), // Using your existing logo
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
        titleBarStyle: 'hiddenInset', // Looks premium on Mac
        autoHideMenuBar: true, // Clean look on Windows
        backgroundColor: '#F9F5EA', // Matches your paper texture base
    })

    // Load the live URL
    // This ensures they always see the latest GitHub version!
    mainWindow.loadURL(LIVE_URL)

    // Open external links in real browser, not inside the app
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url)
        return { action: 'deny' }
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
