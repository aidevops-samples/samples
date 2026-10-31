// 섹션: 내장 도구 — TypeScript 바로 실행 (node examples/greet.ts)
interface User {
  name: string;
  age?: number;
}

function greet(user: User): string {
  return `안녕하세요, ${user.name}님`;
}

console.log(greet({ name: '민지' }));
