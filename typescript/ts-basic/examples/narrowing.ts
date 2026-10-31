// 가이드 "타입 좁히기 (Narrowing)" — node examples/narrowing.ts
import { area, isCircle, type Shape } from '../src/shapes.ts';
import { assertIsString } from '../src/validate.ts';

const shapes: Shape[] = [
  { kind: 'circle', radius: 1 },
  { kind: 'square', side: 3 },
  { kind: 'circle', radius: 2.5 },
];

for (const shape of shapes) {
  console.log(`${shape.kind.padEnd(6)} 넓이 = ${area(shape).toFixed(2)}`);
}

// 1) 타입 가드로 걸러내면 결과 배열의 타입이 Circle[]이 된다
const circles = shapes.filter(isCircle);
console.log('원의 반지름:', circles.map(c => c.radius));

// 2) typeof · instanceof · in 으로도 좁힌다
function describe(value: string | number | Date | { kind: string }): string {
  if (typeof value === 'string') return `문자열(${value.length}자)`;
  if (typeof value === 'number') return `숫자(${value.toFixed(1)})`;
  if (value instanceof Date) return `날짜(${value.toISOString().slice(0, 10)})`;
  if ('kind' in value) return `kind=${value.kind}`;
  return '알 수 없음';
}

console.log(describe('hello'), describe(7), describe(new Date('2026-01-01')), describe({ kind: 'x' }));

// 3) 동등 비교와 진리값으로 좁히기 — null·undefined 제거
function initials(name: string | null | undefined): string {
  if (!name) return '?';                  // null, undefined, '' 제거
  return name.split(' ').map((part) => part[0] ?? '').join('');
}
console.log(initials('Ada Lovelace'), initials(null));

// 4) asserts 함수 — 통과한 다음 줄부터 타입이 좁혀진다
const input: unknown = 'from-env';
assertIsString(input, 'MODE');
console.log('MODE 길이:', input.length);   // 여기서 input은 string

// 5) 좁히기가 풀리는 경우 — 콜백 안에서는 let 변수의 좁힌 타입을 믿지 않는다
let current: string | undefined = 'ready';
const later = () => current?.toUpperCase();  // 나중에 실행되므로 ?. 가 필요
current = undefined;
console.log('later():', later());
