const { ipcRenderer } = require("electron");

let imageView = document.getElementById('imageView');
let imageTag = document.getElementById('imageTag');

ipcRenderer.on("file-context-data", (e, data) => {
  console.log(data);
  imageTag.setAttribute('src', data.inputDir + "\\" + data.files[data.index]);
});

ipcRenderer.on('file-size', (e, data) => {
  imageView.style.setProperty('--image-width', data.width + 'px');
  imageView.style.setProperty('--image-height', data.height + 'px');
  setTimeout(() => {
    imageView.classList.add('transition');
  }, 50)
  
});