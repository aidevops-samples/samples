// 섹션: HTTP 서버와 fetch — 내장 모듈만으로 만든 서버
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }
  res.writeHead(404).end();
});

server.listen(3000, () => console.log('http://localhost:3000'));
