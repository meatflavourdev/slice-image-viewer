const jetpack = require("fs-jetpack");
const path = require("path");
const input = require("./input");
const Directory = require("./Directory");

class FileContext {
  constructor(inputPath) {
    if(!inputPath) throw new Error('Input is empty');
    this.inputPath = input.abslolutePath(inputPath);
    this.existsType = input.exists(this.inputPath);
    this.isDisplayableImage = input.isDisplayableImage(this.inputPath);
    // Check that the inputPath exists
    if(!this.existsType) throw new Error('Input path does not exist');
    // Check that the inputPath is a supported file or directory
    if(this.existsType !== 'dir' && !this.isDisplayableImage) throw new Error('Unsupported file type');
    // Build the directory object
    this.directory = new Directory(this.inputPath);
    // Check that directory contains supported files
    if(this.directory.size <= 0) throw new Error('Directory contains no supported files');
    // Return the file context object
    return this;
  }
}

module.exports = FileContext;
