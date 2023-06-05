const { tags, Tag, baseTags } = require("../model");
module.exports = {
  getRawTags: () => {
    return { code: 200, response: baseTags };
  },
  getTags: () => {
    return { code: 200, response: tags };
  },
  getSelectedTag: (id) => {
    const tag = tags.find((tag) => tag.getId() == id);
    if (tag != undefined) {
      return { code: 200, response: tag };
    } else {
      return { code: 404, response: "brak taga o podanym id" };
    }
  },
  addTag: (name) => {
    if (tags.find((tag) => tag.getName() == name) == undefined) {
      tags.push(new Tag(tags.length, name, 100));
      return { code: 200, response: "Dodano nowy tag:" + name };
    } else {
      return { code: 400, response: "podany tag już istnieje" };
    }
  },
};
