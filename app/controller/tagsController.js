const { tags, Tag, baseTags } = require("../model");
module.exports = {
  getRawTags: () => {
    return baseTags;
  },
  getTags: () => {
    return tags;
  },
  getSelectedTag: (id) => {
    return tags.find((tag) => tag.getId() == id);
  },
  addTag: (name, popularity) => {
    if (tags.find((tag) => tag.getName() == name) == undefined) {
      tags.push(new Tag(tags.length, name, popularity));
      return { message: "Dodano nowy tag:" + name };
    } else {
      return { message: "podany tag już istnieje" };
    }
  },
};
