const jetpack = require("fs-jetpack");
const path = require("path");
const input = require("./input");

class Directory {
  constructor(inputPath) {
    if(!inputPath) throw new Error('Directory path is empty');
    let existsType = input.exists(inputPath);
    // Get the directory path
    this.inputDir = (existsType === 'dir') ? inputPath : path.dirname(inputPath);
    // Get the filename if path resolves to a file
    if(existsType === 'file') this.inputFile = path.basename(inputPath);
    // List directory contents (supported types only) to files array
    if(!input.isDirectory(this.inputDir)) throw new Error('Directory not found or not resolved');
    this.files = jetpack.list(this.inputDir)
          .filter(input.isDisplayableImage)
          .map((fileName) => path.join(this.inputDir, fileName));
    // Calculate index
    if(this.files.length && this.inputFile){
      this.index = this.files.indexOf(path.join(this.inputDir, this.inputFile));
    } else if(this.files.length) {
      this.index = 0;
      this.inputFile = path.basename(this.files[0]);
    } else {
      throw new Error('No supported files found in directory');
    }
    // Return Directory object
    return this;
  }
}

module.exports = Directory;
