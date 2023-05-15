const { ImageArray } = require("../model");

module.exports = {
  getAll: () => {
    return ImageArray;
  },
  getSelected: (id) => {
    return ImageArray.find((image) => image.id == id);
  },
  changePhoto: (id, status) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      ImageArray.find((image) => image.getId() == id).HistoryChange(status);
    }
    return img;
  },
  addTag: (id, name, popularity) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      ImageArray.find((image) => image.getId() == id).addTag(name, popularity);
    }
    return img;
  },
  addTags: (id, tags) => {
    const img = ImageArray.find((image) => image.getId() == id);
    if (img != undefined) {
      ImageArray.find((image) => image.getId() == id).addMassTags(tags);
    }
    return img;
  },
  getTags(id) {
    const img = ImageArray.find((image) => image.getId() == id);
    let tags = [];
    if (img != undefined) {
      tags = ImageArray.find((image) => image.getId() == id).getTags();
    }
    return { id, tags };
  },
};
