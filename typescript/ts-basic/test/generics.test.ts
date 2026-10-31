import { test } from 'node:test';
import assert from 'node:assert/strict';
import { first, groupBy, pick, tuple, QueryBuilder } from '../src/generics.ts';

type Todo = { id: number; title: string; done: boolean };

test('pick은 지정한 키만 남긴다', () => {
  const todo: Todo = { id: 1, title: 'a', done: true };
  assert.deepEqual(pick(todo, ['id', 'done']), { id: 1, done: true });
});

test('first는 빈 배열에서 undefined', () => {
  assert.equal(first([3, 4]), 3);
  assert.equal(first([]), undefined);
});

test('groupBy는 키별로 묶는다', () => {
  const groups = groupBy([1, 2, 3, 4, 5], (n) => (n % 2 === 0 ? 'even' : 'odd'));
  assert.deepEqual(groups, { odd: [1, 3, 5], even: [2, 4] });
});

test('tuple은 받은 값을 그대로 돌려준다', () => {
  assert.deepEqual(tuple('GET', 1, true), ['GET', 1, true]);
});

test('QueryBuilder는 where를 이어 붙여 필터를 만든다', () => {
  const filters = new QueryBuilder<Todo>().where('done', false).where('title', 'x').build();
  assert.deepEqual(filters, { done: false, title: 'x' });
});

test('같은 키에 where를 다시 부르면 마지막 값이 남는다', () => {
  const filters = new QueryBuilder<Todo>().where('id', 1).where('id', 2).build();
  assert.deepEqual(filters, { id: 2 });
});
