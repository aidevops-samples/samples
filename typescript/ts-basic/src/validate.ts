// 가이드 "unknown과 외부 데이터 경계" — JSON 응답처럼 타입을 믿을 수 없는 값을 검사해서 들여온다
import { err, ok, type Result } from './result.ts';

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  tags: string[];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// asserts — 통과하면 호출한 다음 줄부터 value가 string으로 좁혀진다
export function assertIsString(value: unknown, name: string): asserts value is string {
  if (typeof value !== 'string') throw new TypeError(`${name}은(는) 문자열이어야 합니다`);
}

// 모든 필드를 검사해 오류를 한 번에 모은다. 하나씩 고치고 다시 보내는 왕복을 줄인다.
export function parseUser(input: unknown): Result<ApiUser, string[]> {
  if (!isRecord(input)) return err(['객체가 아닙니다']);

  const errors: string[] = [];
  const { id, name, email, tags = [] } = input;

  if (typeof id !== 'number' || !Number.isInteger(id)) errors.push('id: 정수여야 합니다');
  if (typeof name !== 'string' || name.trim() === '') errors.push('name: 비어 있지 않은 문자열이어야 합니다');
  if (typeof email !== 'string' || !email.includes('@')) errors.push('email: 이메일 형식이 아닙니다');
  if (!Array.isArray(tags) || !tags.every((t) => typeof t === 'string')) errors.push('tags: 문자열 배열이어야 합니다');

  if (errors.length > 0) return err(errors);
  // 위 검사를 모두 통과했으므로 단언해도 안전하다 (검사와 단언을 한 함수 안에 둔다)
  return ok({ id, name, email, tags } as ApiUser);
}

// JSON.parse는 any를 돌려준다. 바로 unknown으로 받아서 검사 없이는 쓰지 못하게 한다.
export function parseJson(text: string): Result<unknown> {
  try {
    return ok(JSON.parse(text) as unknown);
  } catch (error) {
    return err(error instanceof Error ? error.message : String(error));
  }
}
