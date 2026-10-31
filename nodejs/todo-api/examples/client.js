// 섹션: HTTP 서버와 fetch — fetch로 요청 보내기 (먼저 npm run dev로 Todo API 실행)
const res = await fetch('http://localhost:3000/todos', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ title: '가이드 읽기' }),
  signal: AbortSignal.timeout(3000),
});

if (!res.ok) throw new Error(`요청 실패: ${res.status}`);
console.log(await res.json());
