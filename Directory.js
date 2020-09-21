const jetpack = require("fs-jetpack");
const path = require("path");
const input = require("./input");

class Directory {
  constructor(inputPath) {
    if (!inputPath) throw new Error("Directory path is empty");

    let existsType = input.exists(inputPath);
    this.inputDir = existsType === "dir" ? inputPath : path.dirname(inputPath);
    if (existsType === "file") this.inputFile = path.basename(inputPath);

    if (!input.isDirectory(this.inputDir))
      throw new Error("Directory not found or not resolved");

    this.fileArray = jetpack
      .list(this.inputDir)
      .filter(input.isDisplayableImage);
    //.map((fileName) => path.join(this.inputDir, fileName));

    this.images = new Map();

    // Calculate index
    if (this.fileArray.length && this.inputFile) {
      //this.index = this.fileArray.indexOf(path.join(this.inputDir, this.inputFile));
      this.index = this.fileArray.indexOf(this.inputFile);
    } else if (this.fileArray.length) {
      this.index = 0;
      this.inputFile = path.basename(this.fileArray[0]);
    } else {
      throw new Error("No supported files found in directory");
    }

    return this;
  }
}

module.exports = Directory;
