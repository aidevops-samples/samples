// 가이드 "enum 대신 as const" — 값과 타입을 한 곳에서 정의한다

// 객체 + as const: 값은 런타임에 남고, 타입은 리터럴 유니온이 된다
export const LogLevel = {
  Debug: 'debug',
  Info: 'info',
  Warn: 'warn',
  Error: 'error',
} as const;

// 같은 이름으로 타입도 만든다: 'debug' | 'info' | 'warn' | 'error'
export type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

export const LOG_LEVELS = Object.values(LogLevel);

// 외부 문자열(환경 변수 등)을 LogLevel로 좁히는 가드
export function isLogLevel(value: string): value is LogLevel {
  return (LOG_LEVELS as readonly string[]).includes(value);
}

// 배열 + as const: 목록을 순회할 수 있고, 요소 타입은 유니온
export const ROLES = ['admin', 'member', 'guest'] as const;
export type Role = (typeof ROLES)[number];

// 순서가 있는 레벨 비교 — 값이 문자열이라 enum의 숫자 비교 대신 순서 표를 둔다
const SEVERITY: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export function shouldLog(level: LogLevel, minimum: LogLevel): boolean {
  return SEVERITY[level] >= SEVERITY[minimum];
}
