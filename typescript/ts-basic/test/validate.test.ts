import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assertIsString, isRecord, parseJson, parseUser } from '../src/validate.ts';

test('올바른 입력은 ApiUser가 되고, tags가 없으면 빈 배열', () => {
  assert.deepEqual(parseUser({ id: 1, name: 'kim', email: 'k@x.dev' }), {
    ok: true,
    value: { id: 1, name: 'kim', email: 'k@x.dev', tags: [] },
  });
});

test('정의하지 않은 필드는 결과에 들어가지 않는다', () => {
  const r = parseUser({ id: 1, name: 'kim', email: 'k@x.dev', isAdmin: true });
  assert.equal(r.ok && 'isAdmin' in r.value, false);
});

test('모든 필드의 오류를 한 번에 모은다', () => {
  assert.deepEqual(parseUser({ id: 1.5, name: ' ', email: 'no-at', tags: [1] }), {
    ok: false,
    error: ['id: 정수여야 합니다', 'name: 비어 있지 않은 문자열이어야 합니다', 'email: 이메일 형식이 아닙니다', 'tags: 문자열 배열이어야 합니다'],
  });
});

test('객체가 아니면 바로 실패', () => {
  for (const input of [null, [], 'text', 42]) {
    assert.deepEqual(parseUser(input), { ok: false, error: ['객체가 아닙니다'] });
  }
});

test('isRecord는 null과 배열을 제외한다', () => {
  assert.equal(isRecord({}), true);
  assert.equal(isRecord(null), false);
  assert.equal(isRecord([]), false);
});

test('assertIsString은 문자열이 아니면 던진다', () => {
  assert.doesNotThrow(() => assertIsString('a', 'x'));
  assert.throws(() => assertIsString(1, 'PORT'), /PORT은\(는\) 문자열이어야 합니다/);
});

test('parseJson은 깨진 JSON을 Result로 돌려준다', () => {
  assert.deepEqual(parseJson('{"a":1}'), { ok: true, value: { a: 1 } });
  assert.equal(parseJson('{').ok, false);
});
