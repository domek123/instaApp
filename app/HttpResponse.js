class HttpResp {
  constructor(response) {
    this.response = response;
  }
  getResponse = (data) => {
    const { code, response } = data;
    this.response.writeHead(code, {
      "Content-Type": "application/json",
    });
    this.response.end(JSON.stringify({ response: response }));
  };

  getPhotoResponse = (data) => {
    const { code, response } = data;
    if (code != 200) {
      this.response.writeHead(code, {
        "Content-Type": "application/json",
      });
      this.response.end(JSON.stringify({ response: response }));
    } else {
      this.response.writeHead(200, {
        "Content-Type": "image/jpg",
      });
      this.response.write(response);
      this.response.end();
    }
  };
}

module.exports = { HttpResp };
