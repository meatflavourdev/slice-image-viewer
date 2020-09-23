const jetpack = require("fs-jetpack");
const path = require("path");
const input = require("./input");
const File = require("./File");

class Directory {
  constructor(inputPath) {
    if (!inputPath) throw new Error("Directory: Input path is empty"); // Throw Error on emput input

    let existsType = input.exists(inputPath); //Check if the inputPath exists and get the type
    if (!existsType) throw new Error("Directory: Input path does not exist");
    this.inputDir = existsType === "dir" ? inputPath : path.dirname(inputPath); //Get the inputDir string based on path type
    if (existsType === "file") this.inputFile = path.basename(inputPath); //Get inputFile if path type is a file

    if (!this.getFiles())
      throw new Error("Directory: No supported files found in directory");

    this.getImages();
    this.getIndex();

    return this;
  }

  getFiles() {
    this.files = jetpack.list(this.inputDir).filter(input.isDisplayableImage);
    //.map((fileName) => path.join(this.inputDir, fileName));
    return this.files.length ? true : false;
  }

  getImages() {
    this.images = new Map(
      this.files.map((fileName) => [
        fileName,
        new File(fileName, this.inputDir),
      ])
    );
    return true;
  }

  getIndex() {
    // Calculate index
    if (this.files.length && this.inputFile) {
      //this.index = this.fileArray.indexOf(path.join(this.inputDir, this.inputFile));
      this.index = this.files.indexOf(this.inputFile);
    } else if (this.files.length) {
      this.index = 0;
      this.inputFile = path.basename(this.files[0]);
    }
    return true;
  }
}

module.exports = Directory;
