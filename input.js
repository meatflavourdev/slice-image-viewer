const jetpack = require("fs-jetpack");
const path = require("path");
const config = require("./config/config");

//Define constants
const cwd = process.cwd();

module.exports = {
  // Returns an absolute path from command line arg input
  getInitPath: function () {
    let args = process.argv;
    let inputPath = args.pop();
    return inputPath ? this.abslolutePath(inputPath) : false;
  },

  // Returns an absolute path
  abslolutePath: function (inputPath = "", dir = cwd) {
    if (!path.isAbsolute(inputPath)) {
      inputPath = path.resolve(dir, inputPath);
    }
    return inputPath;
  },

  isDisplayableImage: function (inputPath) {
    const ext = path.extname(inputPath).slice(1);
    return ext && config.IMAGE_EXTENSIONS.indexOf(ext) > -1;
  },

  isDirectory: function (inputPath) {
    return jetpack.exists(inputPath) === "dir";
  },
};
