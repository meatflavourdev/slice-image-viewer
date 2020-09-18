const { app, BrowserWindow } = require("electron");

module.exports = {
  createMainWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
      width: 1300,
      height: 800,
      webPreferences: {
        //preload: path.join(__dirname, 'preload.js')
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });

    // and load the index.html of the app.
    mainWindow.loadFile("index.html");

    return mainWindow;
  },
};
