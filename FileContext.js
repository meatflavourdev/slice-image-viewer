const jetpack = require("fs-jetpack");
const path = require("path");
const input = require("./input");
const Directory = require("./Directory");

class FileContext {
  constructor(inputPath) {
    if (!inputPath) throw new Error("Input is empty");

    this.inputPath = input.abslolutePath(inputPath);
    this.existsType = input.exists(this.inputPath);
    this.isDisplayableImage = input.isDisplayableImage(this.inputPath);

    if (!this.existsType) throw new Error("Input path does not exist");
    if (this.existsType !== "dir" && !this.isDisplayableImage)
      throw new Error("Unsupported file type");

    this.directory = new Directory(this.inputPath);

    return this;
  }
}

module.exports = FileContext;
