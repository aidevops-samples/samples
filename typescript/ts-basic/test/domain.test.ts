import { test } from 'node:test';
import assert from 'node:assert/strict';
import { addWon, createOrder, toOrderId, toUserId, won } from '../src/domain.ts';

test('검증 함수는 형식에 맞는 값만 통과시킨다', () => {
  assert.equal(toUserId('u_kim'), 'u_kim');
  assert.throws(() => toUserId('kim'), /UserId 형식이 아닙니다/);
  assert.throws(() => toOrderId('u_kim'), /OrderId 형식이 아닙니다/);
});

test('won은 0 이상의 정수만', () => {
  assert.equal(won(0), 0);
  assert.throws(() => won(-1), RangeError);
  assert.throws(() => won(1.5), RangeError);
  assert.equal(addWon(won(1_000), won(500)), 1_500);
});

test('createOrder는 가격을 합산한다', () => {
  const order = createOrder(toOrderId('o_1'), toUserId('u_1'), [won(100), won(250)]);
  assert.deepEqual(order, { id: 'o_1', userId: 'u_1', total: 350 });
  assert.equal(createOrder(toOrderId('o_2'), toUserId('u_1'), []).total, 0);
});
