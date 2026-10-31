import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPath, createGetters } from '../src/advanced.ts';
import { TypedEmitter } from '../src/events.ts';

test('createGetters는 키마다 get 함수를 만든다', () => {
  const getters = createGetters({ name: 'kim', age: 30 });
  assert.equal(getters.getName(), 'kim');
  assert.equal(getters.getAge(), 30);
});

test('buildPath는 :매개변수를 값으로 바꾸고 인코딩한다', () => {
  assert.equal(buildPath('/users/:userId/posts/:postId', { userId: 7, postId: 42 }), '/users/7/posts/42');
  assert.equal(buildPath('/search/:q', { q: 'a b/c' }), '/search/a%20b%2Fc');
  assert.equal(buildPath('/health', {}), '/health');
});

test('타입을 우회해 매개변수가 빠지면 런타임에서도 막는다', () => {
  assert.throws(() => buildPath('/users/:id', {} as { id: string }), /매개변수 id/);
});

test('TypedEmitter — on/emit/해제', () => {
  const bus = new TypedEmitter<{ add: [a: number, b: number]; reset: [] }>();
  const seen: number[] = [];
  const off = bus.on('add', (a, b) => seen.push(a + b));
  bus.on('reset', () => seen.push(0));
  bus.emit('add', 1, 2);
  bus.emit('reset');
  off();
  bus.emit('add', 10, 10);
  assert.deepEqual(seen, [3, 0]);
});
