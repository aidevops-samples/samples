import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parse, parseAll } from '../src/result.ts';

test('숫자 문자열은 ok: true와 값을 돌려준다', () => {
  assert.deepEqual(parse('42'), { ok: true, value: 42 });
  assert.deepEqual(parse('3.5'), { ok: true, value: 3.5 });
});

test('숫자가 아니면 ok: false와 이유를 돌려준다', () => {
  const result = parse('abc');
  assert.equal(result.ok, false);
  if (!result.ok) assert.match(result.error, /"abc" is not a number/);
});

test('빈 문자열은 0이 아니라 실패다 (Number("")는 0이므로 따로 막는다)', () => {
  assert.equal(parse('').ok, false);
  assert.equal(parse('   ').ok, false);
});

test('parseAll은 모두 성공하면 배열을, 하나라도 실패하면 첫 실패를 돌려준다', () => {
  assert.deepEqual(parseAll(['1', '2']), { ok: true, value: [1, 2] });
  assert.deepEqual(parseAll(['1', 'x', 'y']), { ok: false, error: '"x" is not a number' });
});
