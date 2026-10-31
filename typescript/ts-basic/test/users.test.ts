import { test } from 'node:test';
import assert from 'node:assert/strict';
import { UserStore, toPublic, resolveConfig, countByRole } from '../src/users.ts';

const input = { name: '김개발', email: 'kim@example.com', password: 's3cret', role: 'admin' } as const;

test('create는 id를 붙이고, update는 보낸 필드만 바꾼다', () => {
  const store = new UserStore();
  const user = store.create(input);
  assert.equal(user.id, 1);

  const updated = store.update(user.id, { name: '김리드' });
  assert.equal(updated?.name, '김리드');
  assert.equal(updated?.email, 'kim@example.com');
});

test('없는 사용자를 update하면 undefined', () => {
  assert.equal(new UserStore().update(99, { name: 'x' }), undefined);
});

test('toPublic은 password를 뺀다', () => {
  const user = new UserStore().create(input);
  assert.equal('password' in toPublic(user), false);
});

test('list는 id와 name만 돌려준다', () => {
  const store = new UserStore();
  store.create(input);
  assert.deepEqual(store.list(), [{ id: 1, name: '김개발' }]);
});

test('resolveConfig는 기본값을 채운다', () => {
  assert.deepEqual(resolveConfig({ pageSize: 50 }), { pageSize: 50, locale: 'ko-KR' });
});

test('countByRole은 모든 역할을 0부터 센다', () => {
  const store = new UserStore();
  const admin = store.create(input);
  assert.deepEqual(countByRole([admin]), { admin: 1, member: 0 });
});
