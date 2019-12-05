const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
    //console.log(req.url);
    //if(req.url === '/tietoja') {
        //fs.readFile(
           // path.join(__dirname, 'public', 'index.html'), (err, content) => {
            //if(err) throw err;
           // res.writeHead(200, { 'Content-Type': 'text/html' });
          //  res.end(content);
       // })
   // }
//});

  // if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Allu', age: 26 },
  //     { name: 'X7', age: 24 }
  //   ];
  //   res.writeHead(200, { 'Content-Type': 'application/json' });
  //   res.end(JSON.stringify(users));
  // }

  // Build file path
    let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
);

  // Extension of file
    let extname = path.extname(filePath);

  // Initial content type
    let contentType = "text/html";

  // Check ext and set content type
    switch (extname) {
    case ".js":
        contentType = "text/javascript";
    break;
    case ".css":
        contentType = "text/css";
    break;
    case ".json":
        contentType = "application/json";
    break;
    case ".png":
        contentType = "image/png";
    break;
    case ".jpg":
        contentType = "image/jpg";
    break;
}

  // Tarkista on contentType text/html mutta ei .html 
    if (contentType == "text/html" && extname == "") filePath += ".html";

  // log the filePath
        console.log(filePath);

  // Lue tiedosto
        fs.readFile(filePath, (err, content) => {
    if (err) {
    if (err.code == "ENOENT") {
        // Sivua ei löydy
        fs.readFile(
        path.join(__dirname, "public", "404.html"),
        (err, content) => {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
        }
        );
    } else {
        //  Jotain server erroreita
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
    }
    } else {
      // Onnistui
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf8");
    }
});
});

const PORT = process.env.PORT || 2525;

server.listen(PORT, () => console.log(`Serveri käynnissä ja kuuntelee portia ${PORT}`));


