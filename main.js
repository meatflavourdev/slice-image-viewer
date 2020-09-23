const { app, screen } = require("electron");
const { createMainWindow } = require("./window");
const input = require("./input");
const FileContext = require("./FileContext");

let mainWindow = null;

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", function () {
  let fileContext = new FileContext(input.getInitPath()); // Get command line input and build corresponding FileContext object
  let fileTitle = fileContext.directory.files[fileContext.directory.index];
  let fileDimesions = fileContext.directory.images
    .get(fileTitle)
    .dimensions(); // Get dimensions for initial image
  let currentDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint()); // Get display corresponding to mouse cursor's current position

  mainWindow = createMainWindow(currentDisplay, fileDimesions, fileTitle);

  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow.webContents.send("file-context-data", fileContext.directory);
    mainWindow.webContents.send("file-size", fileDimesions);
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.openDevTools();
  }
});

/*
    //mainWindow.openDevTools();
* On macOS it's common to re-create a window in the app when the
* dock icon is clicked and there are no other windows open.
app.on("activate-with-no-open-windows", function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});
*/
