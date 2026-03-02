import express from 'express';
import fs from 'fs';
import path from 'path';

export function serve(rootDirectory, port) {
  const app = express();
  app.use(express.json());

  app.get('/test/mirror', (req, res) => {
    res.status(200).write(`${req.method} ${req.url} HTTP/${req.httpVersion}\r\n`);
    let headers = req.rawHeaders;
    for (let i = 0; i < headers.length; i += 2) {
      res.write(`${headers[i]}: ${headers[i + 1]}\r\n`);
    }
    res.write('\r\n');
    req.pipe(res);
    res.end();
  });

  app.use((req, res) => {
    let filename = req.url.substring(1);
    filename = filename.replace(/\.\.\//g, "");
    filename = path.resolve(rootDirectory, filename);

    let type;
    switch (path.extname(filename)) {
      case ".html":
      case ".htm": type = "text/html"; break;
      case ".js": type = "text/javascript"; break;
      case ".css": type = "text/css"; break;
      case ".png": type = "image/png"; break;
      case ".txt": type = "text/plain"; break;
      default: type = "application/octet-stream";
    }

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
  });

  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}, http://localhost:${port}`);
  });

  return server;
}

// コマンドラインから直接実行された場合のみサーバーを起動
// Jest 環境では require.main が undefined になるため実行されない
if (typeof require !== 'undefined' && require.main === module) {
  serve(process.argv[2] || "./ch16/ex09", parseInt(process.argv[3]) || 8000);
}