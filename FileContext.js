const input = require("./input");
const jetpack = require("fs-jetpack");
const path = require("path");

let files = [];
let fileIndex = 0;

class FileContext {
  constructor(inputPath = "") {
    this.inputPath = input.abslolutePath(inputPath);
    this.initContext();
    return this;
  }

  initContext() {
    if (jetpack.exists(this.inputPath)) {
      if (input.isDisplayableImage(this.inputPath)) {
        this.inputFile = path.basename(this.inputPath);
        this.inputDir = path.dirname(this.inputPath);
      }
      if (input.isDirectory(this.inputDir)) {
        this.files = jetpack
          .list(this.inputDir)
          .filter(input.isDisplayableImage)
          .map((fileName) => path.join(this.inputDir, fileName));
      }
      if (this.files.length && this.inputFile) {
        this.fileIndex = this.files.indexOf(
          path.join(this.inputDir, this.inputFile)
        );
        return true;
      }
    }
    return false;
  }
}

module.exports = FileContext;
