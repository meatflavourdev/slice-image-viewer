const imageSize = require('image-size');

module.exports = {
  getDimensions(imagePath) {
    return imageSize(this.file.path);
  }
}