import net from "net";

export function startServer() {
  // TCP サーバーを作成して、HTTP リクエストを処理する
  const server = net.createServer();
  server.listen(8000, () => {
    console.log("Listening on port 8000, http://localhost:8000");
  });

  // クライアントからの接続を待ち受ける
  server.on("connection", (socket) => {
    socket.on("data", (data) => { // クライアントからのデータを受け取る
      const request = data.toString();
      const [requestLine, ...headerLines] = request.split("\r\n"); // リクエストを行ごとに分割する
      const [method, url, httpVersion] = requestLine.split(" ");  // リクエストラインをスペースで分割して、メソッド、URL、HTTPバージョンを取得する
      console.log(`${method} ${url} ${httpVersion}`);

      if (url === "/") {
        // メソッドが GET で URL が / の場合、フォームを返す

        if (method !== "GET") {
          // メソッドが GET 以外の場合は 405 Method Not Allowed を返す
          socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
          socket.write("Content-Type: text/plain; charset=utf-8\r\n");
          socket.write("\r\n");
          socket.write("Method Not Allowed");
          socket.end();
          return;
        }

        socket.write("HTTP/1.1 200 OK\r\n");
        socket.write("Content-Type: text/html; charset=utf-8\r\n");
        socket.write("\r\n");
        socket.write(`
        <!doctype html>
        <html lang="ja">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Greeting Form</title>
          </head>
          <body>
            <form action="/greeting" method="POST">
              <label for="greeting">Name:</label>
              <input type="text" id="name" name="name" />
              <input type="text" id="greeting" name="greeting" />
              <button type="submit">Submit</button>
            </form>
          </body>
        </html>
      `);
        socket.end();
      } else if (url === "/greeting") {
        // メソッドが POST で URL が /greeting の場合、フォームの内容を解析して挨拶を返す

        if (method !== "POST") {
          // メソッドが POST 以外の場合は 405 Method Not Allowed を返す
          socket.write("HTTP/1.1 405 Method Not Allowed\r\n");
          socket.write("Content-Type: text/plain; charset=utf-8\r\n");
          socket.write("\r\n");
          socket.write("Method Not Allowed");
          socket.end();
          return;
        }

        // ヘッダーの最後の行のリクエストボディから name と greeting の値を取得する
        const body = headerLines[headerLines.length - 1];
        const params = new URLSearchParams(body); // URLSearchParams を使ってクエリパラメータを解析する
        const name = params.get("name");
        const greeting = params.get("greeting");

        socket.write("HTTP/1.1 200 OK\r\n");
        socket.write("Content-Type: text/html; charset=utf-8\r\n");
        socket.write("\r\n");
        socket.write(`
        <!doctype html>
        <html lang="ja">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Greeting Result</title>
          </head>
          <body>
              <h1>${greeting}, ${name}!</h1>
          </body>
        </html>
      `);
        socket.end();
      } else {
        // それ以外のリクエストには 404 Not Found を返す
        socket.write("HTTP/1.1 404 Not Found\r\n");
        socket.write("Content-Type: text/plain; charset=utf-8\r\n");
        socket.write("\r\n");
        socket.write("Not Found");
        socket.end();
      }
    });
  });

  return server;
}

// テストのときはサーバーを起動しないようにする
if (process.env.NODE_ENV !== "test") {
  startServer();
}