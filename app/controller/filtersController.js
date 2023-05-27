const sharp = require("sharp");
const { ImageArray } = require("../model");

module.exports = {
  getMetadata: async (id) => {
    const image = ImageArray.find((photo) => photo.getId() == id);
    if (image != undefined) {
      const path = image.getUrl();
      return new Promise(async (resolve, reject) => {
        try {
          if (path) {
            let meta = await sharp(path).metadata();
            resolve(meta);
          } else {
            resolve({ message: "url_not_found" });
          }
        } catch (err) {
          reject({ message: err.mesage });
        }
      });
    } else {
      return { message: "photo does no exist" };
    }
  },
  filterPhoto: async (data) => {
    const { filter, id, options } = JSON.parse(data);
    const image = ImageArray.find((photo) => photo.getId() == id);
    if (image != undefined) {
      const path = image.getUrl();
      let newPath = path.replace(".jpg", "-" + filter + ".jpg");
      return new Promise(async (resolve, reject) => {
        try {
          if (path) {
            switch (filter) {
              case "rotate":
                await sharp(path).rotate(options.deg).toFile(newPath);
                break;
              case "resize":
                await sharp(path)
                  .resize({
                    width: options.width,
                    height: options.height,
                  })
                  .toFile(newPath);
                break;
              case "reformat":
                newPath = newPath.replace("jpg", "png");
                await sharp(path).toFormat("png").toFile(newPath);
                break;
              case "crop":
                const { width, height, left, top } = options;
                await sharp(path)
                  .extract({ width, height, left, top })
                  .toFile(newPath);
                break;
              case "grayscale":
                await sharp(path).grayscale().toFile(newPath);
                break;
              case "flip":
                await sharp(path).flip().toFile(newPath);
                break;
              case "negate":
                await sharp(path).negate().toFile(newPath);
                break;
              case "tint":
                const { r, g, b } = options;
                await sharp(path).tint({ r, g, b }).toFile(newPath);
                break;
              default:
                console.log("brak opcji");
            }
            resolve(image);
            image.HistoryChange(filter, newPath);
          } else {
            resolve({ message: "url_not_found" });
          }
        } catch (err) {
          reject(err.mesage);
        }
      });
    } else {
      return { message: "photo does no exist" };
    }
  },
};
