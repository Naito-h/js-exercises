import http from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';

function serve(rootDirectory, port) {
  let server = new http.Server();
  server.listen(port);
  console.log(`Listening on port ${port}, http://localhost:${port}`);

  server.on("request", (req, res) => {
    let endpoint = url.parse(req.url).pathname;
    let method = req.method;

    if (endpoint === "/test/mirror") {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.writeHead(200);
      res.write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
      let headers = req.rawHeaders;
      for (let i = 0; i < headers.length; i += 2) {
        res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
      }
      res.write('\r\n');
      req.pipe(res);
    }

    else {
      let filename = endpoint.substring(1);
      filename = filename.replace(/\.\.\//g, "");
      filename = path.resolve(rootDirectory, filename);

      let type;
      switch (path.extname(filename)) {
        case ".html":
        case ".htm": type = "text/html"; break;
        case ".js": type = "application/javascript"; break;
        case ".css": type = "text/css"; break;
        case ".png": type = "image/png"; break;
        case ".txt": type = "text/plain"; break;
        default: type = "application/octet-stream";
      }

      if (method === "PUT") {
        const writeStream = fs.createWriteStream(filename);
        req.pipe(writeStream);

        writeStream.on('finish', () => {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.writeHead(200);
          res.end("File saved successfully");
        });

        writeStream.on('error', (err) => {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.writeHead(500);
          res.end(err.message);
        });
      }

      else {
        let stream = fs.createReadStream(filename);
        stream.once("readable", () => {
          res.setHeader("Content-Type", type);
          res.writeHead(200);
          stream.pipe(res);
        });

        stream.on("error", (err) => {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.writeHead(404);
          res.end(err.message);
        });
      }
    }
  });

  return server;
}

serve(process.argv[2] || "./ch16/ex10", parseInt(process.argv[3]) || 8000);