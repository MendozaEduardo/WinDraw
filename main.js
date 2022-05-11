const { app, BrowserWindow, ipcMain } = require("electron");
require('electron-reload')(__dirname);
const path = require("path");

const loadMainWindow = () => {
    const mainWindow = new BrowserWindow({
        frame: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: __dirname + "//preload.js",
            nodeIntegration: true,
            devTools: true
        },
        fullscreen: true,
        transparent: true,
        alwaysOnTop: true,
    });

    ipcMain.on("close-app", () => app.quit());

    mainWindow.loadFile(path.join(__dirname, "index.html"));    
}

app.on("ready", loadMainWindow);


app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});