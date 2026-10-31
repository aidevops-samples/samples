// 가이드 "제네릭"

// 제약(K extends keyof T)으로 "T에 실제로 있는 키"만 받는다
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.map(k => [k, obj[k]])) as Pick<T, K>;
}

// 입력 배열의 요소 타입이 그대로 결과에 이어진다
export function first<T>(items: readonly T[]): T | undefined {
  return items[0];
}

// 키 타입도 제네릭으로 받는다. 키를 만들지 못한 그룹은 없을 수 있으므로 Partial
export function groupBy<T, K extends PropertyKey>(items: readonly T[], keyOf: (item: T) => K): Partial<Record<K, T[]>> {
  const groups: Partial<Record<K, T[]>> = {};
  for (const item of items) {
    (groups[keyOf(item)] ??= []).push(item);
  }
  return groups;
}

// const 타입 매개변수 — 호출한 쪽에서 as const를 쓰지 않아도 리터럴 튜플로 추론한다
export function tuple<const T extends readonly unknown[]>(...values: T): T {
  return values;
}

// 기본 타입 매개변수 — 지정하지 않으면 string
export type ApiResponse<T, E = string> = { data: T; error?: never } | { data?: never; error: E };

// 조건부 타입 — 내장 NonNullable·ReturnType과 같은 일을 하는 직접 구현
export type MyNonNullable<T> = T extends null | undefined ? never : T;
export type MyReturnType<T extends (...args: never[]) => unknown> =
  T extends (...args: never[]) => infer R ? R : never;

// 빌더 패턴 — this를 돌려줘서 메서드를 이어 부른다
export class QueryBuilder<T> {
  private filters: Partial<T> = {};
  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value;
    return this;
  }
  build(): Partial<T> { return this.filters; }
}
