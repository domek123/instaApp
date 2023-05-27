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
        if (err) {
          return { message: err };
        } else {
          const image = new Image(fields.album, files.file.name, newpath);
          ImageArray.push(image);
          return { message: "dodano zdjęcie" };
        }
      });
    });
  },
  deletePhoto: (id) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img == undefined) {
      return { message: "brak podanego zdjęcia" };
    } else {
      const path = img.getUrl();
      try {
        fs.unlinkSync(path);
        ImageArray.splice(ImageArray.indexOf(img), 1);
        return { message: "usunięto zdjęcie" };
      } catch (err) {
        return { message: err };
      }
    }
  },
  getPhotoById: (id) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      console.log(img.getUrl());
      return fs.readFileSync(img.getUrl());
    } else {
      return { message: "brak zdjęcia" };
    }
  },
  getFilteredPhoto: (id, filtername) => {
    const img = ImageArray.find((image) => image.getId() == id);

    if (img != undefined) {
      const path = img.getUrl().replace(".jpg", "") + "-" + filtername + ".jpg";
      try {
        return fs.readFileSync(path);
      } catch {
        return { message: "brak zdjecia o podanym filtrze" };
      }
    } else {
      return { message: "brak zdjecia o podanym id" };
    }
  },
};
