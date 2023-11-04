const http = require("http");
const fs = require("fs");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview
  if (pathname === "/" || pathname === "/overview") {
    const cardsHtml = productData
      .map((elem) => replaceTemplate(cardTemplate, elem))
      .join("");

    res.writeHead(200, { "content-type": "text/html" });
    const overview = overviewTemplate.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(overview);

    // Product
  } else if (pathname === "/product") {
    let data = productData[query.id];
    res.writeHead(200, { "content-type": "text/html" });
    const output = replaceTemplate(productTemplate, data);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);

    // PAGE NOT FOUND
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
    });
    res.end("<h1>PAGE NOT FOUND</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Started listening on port 8000");
});
