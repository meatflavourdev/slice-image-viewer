const { ipcRenderer } = require("electron");

let imageTag = document.getElementById('imageTag');

ipcRenderer.on("file-context-data", (e, data) => {
  console.log(data.directory.inputDir + "\\" + data.directory.fileArray[data.directory.index]);
  imageTag.setAttribute('src', data.directory.inputDir + "\\" + data.directory.fileArray[data.directory.index]);
});