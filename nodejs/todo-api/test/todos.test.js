import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';

let server;
let baseUrl;

before(async () => {
  server = createApp().listen(0);            // 0 = 빈 포트를 자동으로 선택
  await new Promise((resolve) => server.once('listening', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('할 일을 만들고 조회한다', async () => {
  const created = await fetch(`${baseUrl}/todos`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: '가이드 읽기' }),
  });
  assert.equal(created.status, 201);
  const todo = await created.json();
  assert.deepEqual(todo, { id: 1, title: '가이드 읽기', done: false });

  const found = await fetch(`${baseUrl}/todos/${todo.id}`);
  assert.equal(found.status, 200);
});

test('제목이 비어 있으면 400을 반환한다', async () => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ title: '   ' }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.details.title);
});

test('없는 할 일은 404를 반환한다', async () => {
  const res = await fetch(`${baseUrl}/todos/999`);
  assert.equal(res.status, 404);
});

test('JSON 형식이 깨진 본문은 400을 반환한다', async () => {
  const res = await fetch(`${baseUrl}/todos`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: '{"title":',
  });
  assert.equal(res.status, 400);
});

test('등록되지 않은 경로는 404를 반환한다', async () => {
  const res = await fetch(`${baseUrl}/nope`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: '존재하지 않는 경로입니다' });
});
