// 가이드 "기본 타입과 추론" — node examples/basics.ts

// 1) 추론 — 초기값이 있으면 타입을 쓰지 않아도 된다
let count = 0;              // number
const title = 'TypeScript'; // 'TypeScript' (const는 바뀌지 않으므로 리터럴 타입)
count += 1;
// count = '1';             // TS2322: string은 number에 할당할 수 없음

// 2) 배열과 튜플 — 튜플은 길이와 자리별 타입이 정해진 배열
const scores: number[] = [90, 85, 77];
const entry: [name: string, score: number] = ['kim', 90];
const [name, score] = entry;
console.log(title, count, scores.length, `${name}=${score}`);

// 3) 리터럴 넓히기 — 객체 프로퍼티는 바뀔 수 있으므로 string으로 넓혀진다
const config = { mode: 'production' };          // { mode: string }
const fixed = { mode: 'production' } as const;  // { readonly mode: 'production' }
function setMode(mode: 'development' | 'production'): string {
  return `mode=${mode}`;
}
// setMode(config.mode);    // TS2345: string은 'development' | 'production'에 할당할 수 없음
console.log(setMode(fixed.mode), typeof config.mode);

// 4) satisfies — 형식은 검사하되, 추론된 구체적인 타입은 유지한다
type Route = `/${string}`;
const routes = {
  home: '/',
  users: '/users',
  // about: 'about',        // TS2322: '/'로 시작하지 않음
} satisfies Record<string, Route>;

// routes.users의 타입은 Route가 아니라 '/users' 그대로 남는다. 키도 자동 완성된다.
const usersPath: '/users' = routes.users;
console.log(Object.keys(routes).join(', '), usersPath);

// 5) 선택적 값 — undefined일 수 있으면 확인하기 전에는 쓸 수 없다
const nickname: string | undefined = scores.length > 5 ? 'pro' : undefined;
console.log(nickname?.toUpperCase() ?? '(별명 없음)');

// 6) noUncheckedIndexedAccess — 인덱스 접근 결과에 undefined가 붙는다
const third = scores[2];    // number | undefined
if (third !== undefined) console.log('세 번째 점수:', third.toFixed(1));
