const { ipcRenderer } = require("electron");

let imageView = document.getElementById('imageView');
let imageTag = document.getElementById('imageTag');

ipcRenderer.on("file-context-data", (e, data) => {
  console.log(data.directory.inputDir + "\\" + data.directory.fileArray[data.directory.index]);
  imageTag.setAttribute('src', data.directory.inputDir + "\\" + data.directory.fileArray[data.directory.index]);
});

ipcRenderer.on('file-size', (e, data) => {
  imageView.style.setProperty('--image-width', data.width + 'px');
  imageView.style.setProperty('--image-height', data.height + 'px');
  setTimeout(() => {
    imageView.classList.add('transition');
  }, 50)
  
});