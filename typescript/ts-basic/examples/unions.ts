// 가이드 "유니온과 식별 유니온" — node examples/unions.ts
import { parse, parseAll } from '../src/result.ts';
import { area, type Shape } from '../src/shapes.ts';

// 1) Result — ok를 확인해야 value나 error에 접근할 수 있다
for (const input of ['42', 'abc', '3.14']) {
  const result = parse(input);
  if (result.ok) {
    console.log(`성공: ${result.value * 2}`);   // 여기서 result.value는 number
  } else {
    console.log(`실패: ${result.error}`);        // 여기서 result.error는 string
    // console.log(result.value);  // TS2339 — 실패 분기에는 value가 없다
  }
}

const all = parseAll(['1', '2', 'x', '4']);
console.log('parseAll:', all.ok ? all.value : `중단 — ${all.error}`);

// 2) 식별 유니온 + switch — kind로 분기하면 각 case에서 타입이 정해진다
const shapes: Shape[] = [
  { kind: 'circle', radius: 1 },
  { kind: 'square', side: 3 },
  { kind: 'triangle', base: 4, height: 5 },
];
for (const shape of shapes) {
  console.log(`${shape.kind.padEnd(8)} 넓이 = ${area(shape).toFixed(2)}`);
}

// 3) 상태를 유니온으로 — "로딩 중인데 데이터도 있음" 같은 불가능한 상태를 만들 수 없다
type LoadState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string };

function render(state: LoadState<string[]>): string {
  switch (state.status) {
    case 'idle':    return '대기';
    case 'loading': return '불러오는 중...';
    case 'success': return state.data.join(', ');
    case 'error':   return `오류: ${state.message}`;
  }
}
console.log(render({ status: 'success', data: ['FastAPI', 'Express'] }));
console.log(render({ status: 'error', message: '네트워크 끊김' }));
