const filtersRouter = async (req, res) => {
  if (
    request.url.match(/\/api\/filters\/metadata\/([0-9]+)/) &&
    request.method == "GET"
  ) {
  } else if (req.url == "/api/fiters" && req.method == "PATCH") {
  } else if (
    request.url.match(/\/api\/getfile\/([0-9]+)/) &&
    request.method == "GET"
  ) {
  } else if (
    request.url.match(/\/api\/photos\/([0-9]+)/) &&
    request.method == "GET"
  ) {
  }
};

module.exports = filtersRouter;
