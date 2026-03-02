import request from 'supertest';
import { serve } from './index.js';

describe('serve', () => {
  let server
  beforeAll(() => {
    server = serve('ch16/ex09', 3000);
  });

  afterAll(() => {
    server.close();
  });

  // 存在するファイルへのリクエストのテスト
  test('GET /hello.js', async () => {
    await request(server)
      .get('/hello.js')
      .expect('Content-Type', /text\/javascript/)
      .expect(200)
      .then(response => {
        expect(response.text).toBe('console.log("Hello, World!");');
      });
  });

  // 存在しないファイルへのリクエストのテスト
  test('GET /nonexistent.txt', async () => {
    await request(server)
      .get('/nonexistent.txt')
      .expect('Content-Type', /text\/plain/)
      .expect(404)
      .then(response => {
        expect(response.text).toContain('ENOENT');
      });
  });

  // ミラーリング機能のテスト
  test('GET /test/mirror', async () => {
    await request(server)
      .get('/test/mirror')
      .set('X-Test-Header', 'TestValue')
      .expect(200)
      .then(response => {
        expect(response.text).toContain('GET /test/mirror HTTP/');
        expect(response.text).toContain('X-Test-Header: TestValue');
      });
  });
});