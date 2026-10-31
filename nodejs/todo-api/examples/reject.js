// 섹션: 비동기 오류 처리 — await를 빠뜨리면
// 일부러 실패하는 예제입니다. 실행하면 프로세스가 종료 코드 1로 끝납니다.
async function job() {
  throw new Error('처리되지 않은 오류');
}

job();   // await도 .catch()도 없음 → 프로세스가 종료됩니다

setTimeout(() => console.log('여기는 실행되지 않습니다'), 100);
