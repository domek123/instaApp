const { tags, Tag, baseTags } = require("../model");
module.exports = {
  getRawTags: () => {
    return { code: 200, message: baseTags };
  },
  getTags: () => {
    return { code: 200, message: tags };
  },
  getSelectedTag: (id) => {
    const tag = tags.find((tag) => tag.getId() == id);
    if (tag != undefined) {
      return { code: 200, message: tag };
    } else {
      return { code: 404, message: "brak taga o podanym id" };
    }
  },
  addTag: (name, popularity) => {
    if (tags.find((tag) => tag.getName() == name) == undefined) {
      tags.push(new Tag(tags.length, name, popularity));
      return { code: 200, message: "Dodano nowy tag:" + name };
    } else {
      return { code: 400, message: "podany tag już istnieje" };
    }
  },
};
