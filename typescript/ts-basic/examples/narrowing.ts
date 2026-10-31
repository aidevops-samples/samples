// 가이드 "타입 좁히기 (Narrowing)" — node examples/narrowing.ts
import { area, isCircle, type Shape } from '../src/shapes.ts';

const shapes: Shape[] = [
  { kind: 'circle', radius: 1 },
  { kind: 'square', side: 3 },
  { kind: 'circle', radius: 2.5 },
];

for (const shape of shapes) {
  console.log(`${shape.kind.padEnd(6)} 넓이 = ${area(shape).toFixed(2)}`);
}

// 타입 가드로 걸러내면 결과 배열의 타입이 Circle[]이 된다
const circles = shapes.filter(isCircle);
console.log('원의 반지름:', circles.map(c => c.radius));

// typeof · instanceof · in 으로도 좁힌다
function describe(value: string | number | Date | { kind: string }): string {
  if (typeof value === 'string') return `문자열(${value.length}자)`;
  if (typeof value === 'number') return `숫자(${value.toFixed(1)})`;
  if (value instanceof Date) return `날짜(${value.toISOString().slice(0, 10)})`;
  if ('kind' in value) return `kind=${value.kind}`;
  return '알 수 없음';
}

console.log(describe('hello'), describe(7), describe(new Date('2026-01-01')), describe({ kind: 'x' }));
