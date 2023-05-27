class HttpResp {
  constructor(response) {
    this.response = response;
  }
  getResponse = (data) => {
    this.response.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8",
    });
    this.response.end(JSON.stringify(data));
  };
  getCheckedResponse = (data) => {
    if (data == undefined || data == null) {
      this.response.writeHead(404, {
        "Content-Type": "text/plain;charset=utf-8",
      });
      this.response.write("błąd 404");
      this.response.end();
    } else {
      this.response.writeHead(200, {
        "Content-Type": "text/plain;charset=utf-8",
      });
      this.response.end(JSON.stringify(data));
    }
  };
  getPhotoResponse = (data) => {
    if (!!data.message) {
      this.response.writeHead(404, {
        "Content-Type": "text/plain;charset=utf-8",
      });
      this.response.end(JSON.stringify(data));
    } else {
      this.response.writeHead(200, {
        "Content-Type": "image/jpg",
      });
      this.response.write(data);
      this.response.end();
    }
  };
}

module.exports = { HttpResp };
