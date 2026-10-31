// 가이드 "고급 타입" — keyof·매핑된 타입·조건부 타입·템플릿 리터럴 타입

// 매핑된 타입 + 키 이름 바꾸기(as) — { name: string } → { getName: () => string }
export type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

export function createGetters<T extends object>(obj: T): Getters<T> {
  const getters: Record<string, () => unknown> = {};
  for (const key of Object.keys(obj) as (keyof T & string)[]) {
    getters[`get${key.charAt(0).toUpperCase()}${key.slice(1)}`] = () => obj[key];
  }
  return getters as Getters<T>;
}

// 재귀 매핑 — 중첩된 객체까지 readonly
export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

// infer — 배열 타입에서 요소 타입을 꺼낸다
export type ElementOf<T> = T extends readonly (infer E)[] ? E : never;

// 템플릿 리터럴 타입 + 재귀 — 경로 문자열에서 ":이름" 매개변수를 뽑는다
//   RouteParams<'/users/:userId/posts/:postId'>  →  'userId' | 'postId'
export type RouteParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | RouteParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

export function buildPath<P extends string>(path: P, params: Record<RouteParams<P>, string | number>): string {
  return path.replace(/:(\w+)/g, (_, name: string) => {
    const value = (params as Record<string, string | number>)[name];
    if (value === undefined) throw new Error(`매개변수 ${name}이(가) 없습니다`);
    return encodeURIComponent(String(value));
  });
}
