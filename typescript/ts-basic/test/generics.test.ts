import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pick, QueryBuilder } from '../src/generics.ts';

type Todo = { id: number; title: string; done: boolean };

test('pick은 지정한 키만 남긴다', () => {
  const todo: Todo = { id: 1, title: 'a', done: true };
  assert.deepEqual(pick(todo, ['id', 'done']), { id: 1, done: true });
});

test('QueryBuilder는 where를 이어 붙여 필터를 만든다', () => {
  const filters = new QueryBuilder<Todo>().where('done', false).where('title', 'x').build();
  assert.deepEqual(filters, { done: false, title: 'x' });
});

test('같은 키에 where를 다시 부르면 마지막 값이 남는다', () => {
  const filters = new QueryBuilder<Todo>().where('id', 1).where('id', 2).build();
  assert.deepEqual(filters, { id: 2 });
});
