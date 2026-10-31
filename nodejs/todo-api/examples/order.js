// 섹션: 이벤트 루프 & 비동기 — 실행 순서
console.log('1. 동기 코드');

setTimeout(() => console.log('4. setTimeout (타이머 콜백)'), 0);

Promise.resolve().then(() => console.log('3. Promise.then (마이크로태스크)'));

console.log('2. 동기 코드');

// 출력: 1 → 2 → 3 → 4
// 동기 코드가 모두 끝난 뒤, 마이크로태스크(Promise)가 타이머보다 먼저 실행됩니다.
