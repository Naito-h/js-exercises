import { startServer } from "./server.js";

describe("HTTPサーバーのテスト", () => {
  let server;

  beforeAll(() => {
    server = startServer();
  });

  afterAll((done) => {
    server.close(done);
  });

  it("GET / にアクセスするとフォームが返される", async () => {
    const response = await fetch("http://localhost:8000/");
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("<form action=\"/greeting\" method=\"POST\">");
  });

  it("POST /greeting にアクセスすると挨拶が返される", async () => {
    const response = await fetch("http://localhost:8000/greeting", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: "name=Alice&greeting=Hello"
    });
    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toContain("<h1>Hello, Alice!</h1>");
  });

  it("GET /greeting にアクセスすると405が返される", async () => {
    const response = await fetch("http://localhost:8000/greeting");
    expect(response.status).toBe(405);
    const text = await response.text();
    expect(text).toBe("Method Not Allowed");
  });

  it("存在しないURLにアクセスすると404が返される", async () => {
    const response = await fetch("http://localhost:8000/nonexistent");
    expect(response.status).toBe(404);
    const text = await response.text();
    expect(text).toBe("Not Found");
  });
});