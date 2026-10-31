// 가이드 "타입 시스템" — node examples/types.ts
import { parse } from '../src/result.ts';

for (const input of ['42', 'abc', '3.14']) {
  const result = parse(input);
  if (result.ok) {
    console.log(`성공: ${result.value * 2}`);   // 여기서 result.value는 number
  } else {
    console.log(`실패: ${result.error}`);        // 여기서 result.error는 string
    // console.log(result.value);  // TS2339 — 실패 분기에는 value가 없다
  }
}
