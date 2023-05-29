class Image {
  constructor(albumName, originalName, url) {
    this.id = Date.now();
    this.album = albumName;
    this.originalName = originalName;
    this.url = url;
    this.lastChange = "original";
    this.history = [
      {
        status: "original",
        lastModifiedDate: Date.now(),
      },
    ];
    this.tags = [];
  }
  HistoryChange = (status, path) => {
    this.history.push({ status: status, lastModifiedDate: Date.now(), path });
    this.lastChange = this.history[this.history.length - 1].status;
  };
  ReturnImage = () => {
    return {
      id: this.id,
      album: this.album,
      originalName: this.originalName,
      url: this.url,
      lastChange: this.lastChange,
      history: this.history,
    };
  };
  getId = () => {
    return this.id;
  };
  getUrl = () => {
    return this.url;
  };
  addTag(name, popularity) {
    this.tags.push({ name, popularity });
  }
  addMassTags(tags) {
    tags.forEach((tag) => this.tags.push(tag));
  }
  getTags() {
    return this.tags;
  }
  getAlbumName() {
    return this.album;
  }
}

let ImageArray = [];

// tags

class Tag {
  constructor(id, name, popularity) {
    this.id = id;
    this.name = name;
    this.popularity = popularity;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
}

const baseTags = [
  "#love",
  "#instagood",
  "#fashion",
  "#photooftheday",
  "#art",
  "photography",
  "instagram",
  "beautiful",
  "picoftheday",
  "nature",
  "happy",
  "cute",
  "travel",
  "style",
  "followme",
  "tbt",
  "instadaily",
  "repost",
  "like4like",
  "summer",
  "beauty",
  "fitness",
  "food",
  "selfie",
  "me",
  "instalike",
  "girl",
  "friends",
  "fun",
];

const tags = baseTags.map((tag, index) => {
  return new Tag(index, tag, Math.floor(Math.random() * 900) + 100);
});

//user

class User {
  constructor(name, email, password) {
    this.id = Math.floor(Math.random() * 10000);
    this.name = name;
    this.email = email;
    this.password = password;
    this.confirmed = false;
    this.token = "";
  }
  getEmail = () => {
    return this.email;
  };
  getPassword = () => {
    return this.password;
  };
  AuthUser = () => {
    this.confirmed = true;
  };
  setToken(token) {
    this.token = token;
  }
  getToken(){
    return this.token
  }
  setEmail(email){
    this.email = email
  }
  setName(name){
    this.name = name
  }
}

let userArray = [];

module.exports = { Image, ImageArray, Tag, baseTags, tags, User, userArray };
