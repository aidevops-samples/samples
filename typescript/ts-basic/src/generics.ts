// 가이드 "제네릭"
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return Object.fromEntries(keys.map(k => [k, obj[k]])) as Pick<T, K>;
}

// 조건부 타입 — 내장 NonNullable·ReturnType과 같은 일을 하는 직접 구현
export type MyNonNullable<T> = T extends null | undefined ? never : T;
export type MyReturnType<T extends (...args: never[]) => unknown> =
  T extends (...args: never[]) => infer R ? R : never;

// 빌더 패턴
export class QueryBuilder<T> {
  private filters: Partial<T> = {};
  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters[key] = value;
    return this;
  }
  build(): Partial<T> { return this.filters; }
}
