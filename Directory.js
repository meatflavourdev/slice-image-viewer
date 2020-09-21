const jetpack = require("fs-jetpack");
const path = require("path");
const input = require("./input");
const Image = require("./Image");

class Directory {
  constructor(inputPath) {
    if (!inputPath) throw new Error("Directory: Input path is empty"); // Throw Error on emput input

    let existsType = input.exists(inputPath);
    this.inputDir = existsType === "dir" ? inputPath : path.dirname(inputPath);
    if (existsType === "file") this.inputFile = path.basename(inputPath);

    if (!this.getFiles())
      throw new Error("Directory: No supported files found in directory");

  getFiles() {
    this.fileArray = jetpack
      .list(this.inputDir)
      .filter(input.isDisplayableImage);
    //.map((fileName) => path.join(this.inputDir, fileName));
    return (this.fileArray.length) ? true : false;
  }

    this.images = new Map();

    // Calculate index
    if (this.fileArray.length && this.inputFile) {
      //this.index = this.fileArray.indexOf(path.join(this.inputDir, this.inputFile));
      this.index = this.fileArray.indexOf(this.inputFile);
    } else if (this.fileArray.length) {
      this.index = 0;
      this.inputFile = path.basename(this.fileArray[0]);
    }

    return this;
  }
}

module.exports = Directory;
