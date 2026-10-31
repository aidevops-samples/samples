// 가이드 "함수 타입" — node examples/functions.ts

// 1) 매개변수와 반환 타입. 선택 매개변수(?)와 기본값
function greet(name: string, greeting = '안녕하세요', suffix?: string): string {
  return `${greeting}, ${name}님${suffix ?? ''}`;
}
console.log(greet('김개발'), '/', greet('이운영', '반갑습니다', '!'));

// 2) 함수 타입을 이름으로 — 콜백 시그니처를 한 번만 정의한다
type Comparator<T> = (a: T, b: T) => number;
const byLength: Comparator<string> = (a, b) => a.length - b.length;  // a, b는 string으로 추론
console.log(['typescript', 'go', 'java'].sort(byLength));

// 3) 나머지 매개변수
function sum(...values: number[]): number {
  return values.reduce((acc, v) => acc + v, 0);
}
console.log('sum:', sum(1, 2, 3, 4));

// 4) 오버로드 — 입력 타입에 따라 반환 타입이 달라질 때
function parseInput(input: string): number;
function parseInput(input: string[]): number[];
function parseInput(input: string | string[]): number | number[] {
  return Array.isArray(input) ? input.map(Number) : Number(input);
}
const one = parseInput('42');           // number
const many = parseInput(['1', '2']);    // number[]
console.log(one + 1, many.map((n) => n * 10));

// 5) void와 never — 반환값이 없는 함수 vs 끝나지 않는 함수
function log(message: string): void {
  console.log(`[log] ${message}`);
}
function fail(message: string): never {
  throw new Error(message);
}
log('void 함수');
try {
  fail('never 함수는 정상적으로 돌아오지 않습니다');
} catch (error) {
  console.log('잡음:', (error as Error).message);
}

// 6) 객체 매개변수는 구조 분해와 함께 타입을 붙인다
type PageOptions = { page?: number; size?: number };
function paginate<T>(items: readonly T[], { page = 1, size = 2 }: PageOptions = {}): T[] {
  return items.slice((page - 1) * size, page * size);
}
console.log(paginate(['a', 'b', 'c', 'd', 'e'], { page: 2 }));
