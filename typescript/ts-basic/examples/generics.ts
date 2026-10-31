// 가이드 "제네릭" — node examples/generics.ts
import { pick, QueryBuilder, type MyNonNullable, type MyReturnType } from '../src/generics.ts';

type Todo = { id: number; title: string; done: boolean; owner: string };

const todo: Todo = { id: 1, title: '가이드 읽기', done: false, owner: 'kim' };

const summary = pick(todo, ['id', 'title']);   // Pick<Todo, 'id' | 'title'>
console.log('pick:', summary);
// pick(todo, ['color']);  // TS2322 — 'color'는 keyof Todo가 아님

const filters = new QueryBuilder<Todo>()
  .where('done', false)
  .where('owner', 'kim')
  // .where('done', 'no')  // TS2345 — done은 boolean
  .build();
console.log('filters:', filters);

// 조건부 타입은 런타임 값이 없으므로 컴파일 시점에만 확인된다
function findOwner(id: number): string | null {
  return id === 1 ? todo.owner : null;
}
type Owner = MyReturnType<typeof findOwner>;        // string | null
type DefiniteOwner = MyNonNullable<Owner>;           // string

const owner: DefiniteOwner = findOwner(1) ?? 'unknown';
console.log('owner:', owner);
