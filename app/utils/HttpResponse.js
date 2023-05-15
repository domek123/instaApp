class HttpResp {
  constructor(response) {
    this.response = response;
  }
  getResponse = (data) => {
    this.response.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8",
    });
    this.response.end(data);
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
  getStringifyResponse = (data) => {
    this.response.writeHead(200, {
      "Content-Type": "text/plain;charset=utf-8",
    });
    this.response.end(JSON.stringify(data));
  };
}

module.exports = { HttpResp };
