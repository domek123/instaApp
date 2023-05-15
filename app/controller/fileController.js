const fs = require("fs");
const { Image, ImageArray } = require("../model");
const formidable = require("formidable");

const createFolder = (albumName) => {
  const dir = `./upload/${albumName}`;
  try {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createFolder: (albumName) => {
    createFolder(albumName);
  },
  savePhoto: (request) => {
    const form = new formidable.IncomingForm();
    form.parse(request, async (err, fields, files) => {
      createFolder(fields.album);
      const oldPath = files.file.path;

      const name = files.file.path.split("\\").pop();
      let dirn = __dirname.replace("app", "").replace("controller", "");

      var newpath = dirn + `upload/${fields.album}/${name}.jpg`;
      let rawData = fs.readFileSync(oldPath);

      fs.writeFile(newpath, rawData, function (err) {
        if (err) console.log("XD", err);
        else {
          const image = new Image(fields.album, files.file.name, newpath);
          ImageArray.push(image);
          return "dodano zdjecie";
        }
      });
    });
  },
  deletePhoto: (id) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img == undefined) {
      return "brak podanego zdjecia";
    } else {
      const path = img.getUrl();
      console.log(path);
      try {
        fs.unlinkSync(path);
        ImageArray.splice(ImageArray.indexOf(img), 1);
        return "usunieto zdjecie";
      } catch (err) {
        return err;
      }
    }
  },
};
