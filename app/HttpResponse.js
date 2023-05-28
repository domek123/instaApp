class HttpResp {
  constructor(response) {
    this.response = response;
  }
  getResponse = (data) => {
    const { code, message } = data;
    this.response.writeHead(code, {
      "Content-Type": "application/json",
    });
    this.response.end(JSON.stringify({ message: message }));
  };

  getPhotoResponse = (data) => {
    const { code, message } = data;
    if (code != 200) {
      this.response.writeHead(code, {
        "Content-Type": "application/json",
      });
      this.response.end(JSON.stringify({ message: message }));
    } else {
      this.response.writeHead(200, {
        "Content-Type": "image/jpg",
      });
      this.response.write(message);
      this.response.end();
    }
  };
}

module.exports = { HttpResp };
