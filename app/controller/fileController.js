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
          return { code: 400, message: err };
        } else {
          const img = new Image(fields.album, files.file.name, newpath);
          ImageArray.push(img);
        }
      });
    });
  },
  deletePhoto: (id) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img == undefined) {
      return { code: 404, message: "brak podanego zdjęcia" };
    } else {
      const path = img.getUrl();
      try {
        fs.unlinkSync(path);
        ImageArray.splice(ImageArray.indexOf(img), 1);
        return { code: 200, message: "usunięto zdjęcie" };
      } catch (err) {
        return { code: 400, message: err };
      }
    }
  },
  getPhotoById: (id) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      return { code: 200, message: fs.readFileSync(img.getUrl()) };
    } else {
      return { code: 404, message: "brak zdjęcia" };
    }
  },
  getFilteredPhoto: (id, filtername) => {
    const img = ImageArray.find((image) => image.getId() == id);

    if (img != undefined) {
      const path = img.getUrl().replace(".jpg", "") + "-" + filtername + ".jpg";
      try {
        return { code: 200, message: fs.readFileSync(path) };
      } catch {
        return { code: 404, message: "brak zdjecia o podanym filtrze" };
      }
    } else {
      return { code: 404, message: "brak zdjecia o podanym id" };
    }
  },
};
