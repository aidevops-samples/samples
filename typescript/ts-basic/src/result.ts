// 가이드 "타입 시스템" — Discriminated Union (추천 패턴)
export type Result<T> =
  | { ok: true;  value: T }
  | { ok: false; error: string };

export function parse(input: string): Result<number> {
  const n = Number(input);
  return isNaN(n)
    ? { ok: false, error: `"${input}" is not a number` }
    : { ok: true, value: n };
}
