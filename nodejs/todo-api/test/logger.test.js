import { test } from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import { requestContext, log } from '../src/logger.js';

test('요청 ID가 응답 헤더와 로그에 함께 남는다', async (t) => {
  const lines = [];
  t.mock.method(console, 'log', (line) => lines.push(JSON.parse(line)));

  const app = express();
  app.use(requestContext);
  app.get('/', async (req, res) => {
    await new Promise((resolve) => setTimeout(resolve, 5));   // 비동기 경계를 넘어도 유지되는지
    log('info', '조회', { orderId: 42 });
    res.end();
  });

  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}/`, {
      headers: { 'x-request-id': 'req-123' },
    });
    assert.equal(res.headers.get('x-request-id'), 'req-123');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  assert.equal(lines.length, 1);
  assert.equal(lines[0].requestId, 'req-123');
  assert.equal(lines[0].orderId, 42);
});

test('요청 밖에서 남긴 로그에는 요청 ID가 없다', (t) => {
  const spy = t.mock.method(console, 'log', () => {});
  log('warn', '배치 시작');
  const entry = JSON.parse(spy.mock.calls[0].arguments[0]);
  assert.equal(entry.requestId, undefined);
  assert.equal(entry.level, 'warn');
});
