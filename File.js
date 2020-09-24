const path = require("path");
const imageSize = require('image-size');
//const fileType = require('file-type');
//const sharp = require('sharp');

class File {
  constructor(filename, directory) {
    this.file = {};
    this.file.name = filename;
    this.file.directory = directory;
    this.file.path = path.join(directory, filename);
    return this;
  }

  dimensions() {
    if(!this._dimensions){
      this._dimensions = imageSize(this.file.path);
    }
    return this._dimensions;
  }
}

module.exports = File;