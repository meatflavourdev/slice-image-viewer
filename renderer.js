const { ipcRenderer } = require("electron");
const mousetrap = require("mousetrap");

// Variable Definitions
let imageView = document.getElementById("imageView");
let imageTag = document.getElementById("imageTag");
let directory = null;

// Helper functions
let previousImage = () => {
  console.log("previousImage() function called");
};

let nextImage = () => {
  console.log("nextImage() function called");
};

// IPC event handlers
ipcRenderer.on("file-context-data", (e, data) => {
  directory = data; // Store data passed from event
  console.log(data); //Log data
  imageTag.setAttribute("src", data.inputDir + "\\" + data.files[data.index]); //Display the initial image
  // @todo We should get the image dimensions here and set the CSS properties and remove the 'file-size' event entirely
});

ipcRenderer.on("file-size", (e, data) => {
  imageView.style.setProperty("--image-width", data.width + "px");
  imageView.style.setProperty("--image-height", data.height + "px");
  setTimeout(() => {
    imageView.classList.add("transition");
  }, 50);
});

// Keyboard event bindings
Mousetrap.bind("left", previousImage);
Mousetrap.bind("right", nextImage);
