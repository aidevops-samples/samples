// 가이드 "유니온과 식별 유니온" — 성공과 실패를 하나의 타입으로 표현하는 Result

// ok 필드가 식별자(discriminant)다. ok를 확인하면 나머지 필드의 타입이 정해진다.
export type Result<T, E = string> =
  | { ok: true;  value: T }
  | { ok: false; error: E };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

export function parse(input: string): Result<number> {
  const n = Number(input);
  return input.trim() === '' || isNaN(n)
    ? err(`"${input}" is not a number`)
    : ok(n);
}

// 첫 번째 실패에서 멈추고 그 이유를 돌려준다
export function parseAll(inputs: readonly string[]): Result<number[]> {
  const values: number[] = [];
  for (const input of inputs) {
    const result = parse(input);
    if (!result.ok) return result;   // 여기서 result는 { ok: false; error: string }
    values.push(result.value);
  }
  return ok(values);
}
