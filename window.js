const { BrowserWindow } = require("electron");
const config = require("./config/config");

module.exports.createMainWindow = (display, dimensions, title) => {
  const DISPLAY = display;
  const DIMENSIONS = {
    width: dimensions.width,
    height: dimensions.height,
  };
  const POSITION = getWindowPosition(DISPLAY, DIMENSIONS);

  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: DIMENSIONS.width,
    height: DIMENSIONS.height,
    x: POSITION.x,
    y: POSITION.y,
    title: title + " - " + config.APPLICATION_TITLE,
    minWidth: 320,
    minHeight: 250,
    autoHideMenuBar: true,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js')
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  return mainWindow;
};

// @todo Improve logic for edge cases
let getWindowPosition = (display, dimensions) => {
  let position = {
    x: display.bounds.x + (display.bounds.width - dimensions.width) / 2,
    y: display.bounds.y + (display.bounds.height - dimensions.height) / 2,
  };
  return position;
}