// 가이드 "오류 처리" — 오류 클래스 계층, cause, catch의 unknown

export class AppError extends Error {
  readonly code: string;

  constructor(code: string, message: string, options?: ErrorOptions) {
    super(message, options);          // options.cause로 원인 오류를 이어 둔다
    this.name = new.target.name;      // 하위 클래스 이름이 그대로 들어간다
    this.code = code;
  }
}

export class NotFoundError extends AppError {
  readonly resource: string;

  constructor(resource: string, id: string) {
    super('NOT_FOUND', `${resource} ${id}을(를) 찾을 수 없습니다`);
    this.resource = resource;
  }
}

export class ValidationError extends AppError {
  readonly issues: readonly string[];

  constructor(issues: readonly string[]) {
    super('VALIDATION_FAILED', `입력값 오류 ${issues.length}건`);
    this.issues = issues;
  }
}

// catch (error)의 error는 unknown이다 (strict의 useUnknownInCatchVariables).
// throw는 문자열도 던질 수 있으므로, 쓰기 전에 무엇인지 확인한다.
export function describeError(error: unknown): string {
  if (error instanceof ValidationError) return `[${error.code}] ${error.issues.join(', ')}`;
  if (error instanceof AppError) return `[${error.code}] ${error.message}`;
  if (error instanceof Error) return error.message;
  return String(error);
}

// 아래 계층의 오류를 의미 있는 오류로 감싸되, 원래 오류는 cause로 남긴다
export function loadConfig(text: string): Record<string, unknown> {
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch (error) {
    throw new AppError('CONFIG_INVALID', '설정 파일을 읽을 수 없습니다', { cause: error });
  }
}
