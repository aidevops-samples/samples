import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../src/result.ts';

test('숫자 문자열은 ok: true와 값을 돌려준다', () => {
  assert.deepEqual(parse('42'), { ok: true, value: 42 });
  assert.deepEqual(parse('3.5'), { ok: true, value: 3.5 });
});

test('숫자가 아니면 ok: false와 이유를 돌려준다', () => {
  const result = parse('abc');
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /"abc" is not a number/);
});
