// 가이드 "프로젝트 설정과 실행" — Node.js 24는 .ts 파일을 그대로 실행합니다.
//   node examples/setup.ts      실행 (타입은 지우기만 하고 검사하지 않음)
//   npx tsc                     타입 검사 (tsconfig.json의 strict 설정 적용)

function greet(name: string, times = 1): string {
  return `안녕하세요, ${name}님! `.repeat(times).trim();
}

console.log(greet('TypeScript'));
console.log(greet('strict 모드', 2));

// strict가 켜져 있으면 아래 줄의 주석을 풀었을 때 tsc가 오류를 냅니다.
// greet(undefined);           // TS2345: undefined는 string에 할당할 수 없음
// const len = greet.length2;  // TS2339: 없는 프로퍼티

console.log(`Node.js ${process.version}에서 실행`);
