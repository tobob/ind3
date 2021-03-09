var Jimp = require("jimp");
const inputFolder = "./source/images/";
const processedFolder = "./dist/images/";
const fs = require("fs");

fs.readdir(inputFolder, (err, files) => {
  files.forEach((file) => {
    if (file.toLowerCase().endsWith(".jpg")) {
      resizeImage(file);
    }
  });
});

function resizeImage(fileName) {
  Jimp.read(inputFolder + fileName)
    .then(function (image) {
      image.resize(500, Jimp.AUTO).write(processedFolder + fileName);
    })
    .catch(function (e) {
      console.log(e, fileName);
    });
}
