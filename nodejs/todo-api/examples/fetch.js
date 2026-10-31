// 섹션: 비동기 오류 처리 — 타임아웃과 부분 실패 처리 (인터넷 연결 필요)
async function getJson(url) {
  // 3초 안에 응답이 없으면 TimeoutError로 중단
  const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
  if (!res.ok) throw new Error(`요청 실패: ${res.status} ${url}`);
  return res.json();
}

// 하나가 실패해도 나머지 결과를 받으려면 allSettled
const results = await Promise.allSettled([
  getJson('https://registry.npmjs.org/express/latest'),
  getJson('https://registry.npmjs.org/this-package-does-not-exist-xyz-123/latest'),
]);

for (const result of results) {
  if (result.status === 'fulfilled') console.log('성공:', result.value.name);
  else console.log('실패:', result.reason.message);
}

// 성공: express
// 실패: 요청 실패: 404 https://registry.npmjs.org/...
