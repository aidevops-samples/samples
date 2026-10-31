// 가이드 "제네릭" — node examples/generics.ts
import { first, groupBy, pick, tuple, QueryBuilder, type MyNonNullable, type MyReturnType } from '../src/generics.ts';

type Todo = { id: number; title: string; done: boolean; owner: string };

const todos: Todo[] = [
  { id: 1, title: '가이드 읽기', done: false, owner: 'kim' },
  { id: 2, title: '예제 실행', done: true, owner: 'lee' },
  { id: 3, title: '테스트 작성', done: false, owner: 'kim' },
];

// 1) 타입 매개변수는 인자에서 추론된다
const firstTodo = first(todos);          // Todo | undefined
console.log('first:', firstTodo?.title);

// 2) 제약 — keyof로 실제 키만 받는다
const summary = pick(todos[0]!, ['id', 'title']);   // Pick<Todo, 'id' | 'title'>
console.log('pick:', summary);
// pick(todos[0]!, ['color']);  // TS2322 — 'color'는 keyof Todo가 아님

// 3) 키 타입까지 추론 — 결과는 Partial<Record<string, Todo[]>>
const byOwner = groupBy(todos, (t) => t.owner);
console.log('groupBy:', Object.entries(byOwner).map(([owner, list]) => `${owner}=${list?.length}`).join(', '));

// 4) const 타입 매개변수 — ['GET', 'POST']가 string[]이 아니라 readonly ['GET', 'POST']
const methods = tuple('GET', 'POST');
console.log('tuple:', methods, methods.length);

// 5) 빌더 패턴 — where의 값 타입이 키에 맞춰진다
const filters = new QueryBuilder<Todo>()
  .where('done', false)
  .where('owner', 'kim')
  // .where('done', 'no')  // TS2345 — done은 boolean
  .build();
console.log('filters:', filters);

// 6) 조건부 타입은 런타임 값이 없으므로 컴파일 시점에만 확인된다
function findOwner(id: number): string | null {
  return todos.find((t) => t.id === id)?.owner ?? null;
}
type Owner = MyReturnType<typeof findOwner>;        // string | null
type DefiniteOwner = MyNonNullable<Owner>;           // string

const owner: DefiniteOwner = findOwner(1) ?? 'unknown';
console.log('owner:', owner);
