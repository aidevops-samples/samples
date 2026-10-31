// 가이드 "테스트 — 런타임과 타입" — 타입 추론이 의도대로인지 tsc로 검사하는 타입 테스트.
// 실행 결과가 아니라 `npm run typecheck`가 통과하는지로 검증한다.
// ts-expect-error 주석을 단 줄에서 오류가 나지 않으면(= 타입이 너무 느슨해지면) tsc가 실패한다.
import { test } from 'node:test';
import type { RouteParams, Getters, ElementOf } from '../src/advanced.ts';
import type { MyReturnType } from '../src/generics.ts';
import { groupBy, tuple } from '../src/generics.ts';
import type { LogLevel, Role } from '../src/constants.ts';
import type { OrderId, UserId } from '../src/domain.ts';
import { parse } from '../src/result.ts';

// 두 타입이 정확히 같을 때만 true
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
function expectType<T extends true>(): T | void {}

expectType<Equal<RouteParams<'/users/:userId/posts/:postId'>, 'userId' | 'postId'>>();
expectType<Equal<RouteParams<'/health'>, never>>();
expectType<Equal<Getters<{ name: string }>, { getName: () => string }>>();
expectType<Equal<ElementOf<readonly ['a', 'b']>, 'a' | 'b'>>();
expectType<Equal<MyReturnType<(id: number) => string | null>, string | null>>();
expectType<Equal<LogLevel, 'debug' | 'info' | 'warn' | 'error'>>();
expectType<Equal<Role, 'admin' | 'member' | 'guest'>>();
expectType<Equal<ReturnType<typeof tuple<['GET', 'POST']>>, ['GET', 'POST']>>();
expectType<Equal<ReturnType<typeof groupBy<number, 'odd' | 'even'>>, Partial<Record<'odd' | 'even', number[]>>>>();

// 실행하지 않는 함수 안에 둔다 — 타입 검사만 받는다
function typeOnly(userId: UserId, orderId: OrderId) {
  const r = parse('1');
  if (r.ok) expectType<Equal<typeof r.value, number>>();
  else expectType<Equal<typeof r.error, string>>();

  // @ts-expect-error — UserId와 OrderId는 섞이지 않는다
  const wrong: OrderId = userId;
  // @ts-expect-error — 검증하지 않은 string은 UserId가 아니다
  const raw: UserId = 'u_kim';
  const same: OrderId = orderId;
  return [wrong, raw, same];
}

test('타입 테스트는 tsc에서 검증된다', () => {
  void typeOnly;
});
