const { ImageArray } = require("../model");

module.exports = {
  getAll: () => {
    return { code: 200, response: ImageArray };
  },
  getSelected: (id) => {
    const img = ImageArray.find((image) => image.id == id);
    if (img != undefined) {
      return { code: 200, response: img };
    } else {
      return { code: 404, response: "brak zdjecia o podanym id" };
    }
  },
  changePhoto: (id, status) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      ImageArray.find((image) => image.getId() == id).HistoryChange(status);
      return { code: 200, response: img };
    } else {
      return { code: 404, response: "brak zdjecia o podanym id" };
    }
  },
  addTag: (id, name, popularity) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      ImageArray.find((image) => image.getId() == id).addTag(name, popularity);
      return { code: 200, response: img };
    } else {
      return { code: 404, response: "brak zdjecia o podanym id" };
    }
  },
  addTags: (id, tags) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      ImageArray.find((image) => image.getId() == id).addMassTags(tags);
      return { code: 200, response: img };
    } else {
      return { code: 404, response: "brak zdjecia o podanym id" };
    }
  },
  getTags(id) {
    const img = ImageArray.find((image) => image.getId() == id);
    let tags;
    if (img != undefined) {
      tags = ImageArray.find((image) => image.getId() == id).getTags();
      return { code: 200, id, tags };
    } else {
      return { code: 404, response: "brak zdjecia o podanym id" };
    }
  },
  getImagesFromAlbum: (folderName) => {
    const albumImages = ImageArray.filter(
      (img) => img.getAlbumName() == folderName
    );
    return { code: 200, response: albumImages };
  },
};
