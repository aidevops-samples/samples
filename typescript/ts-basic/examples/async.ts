// 가이드 "비동기 코드의 타입" — node examples/async.ts
import { mapLimit, sleep, TimeoutError, withTimeout } from '../src/async.ts';

type User = { id: number; name: string };

async function fetchUser(id: number, signal?: AbortSignal): Promise<User> {
  await sleep(20 * id, signal);           // 네트워크 지연 흉내
  return { id, name: `user${id}` };
}

// 1) async 함수의 반환 타입은 Promise<T>, await하면 T
const user = await fetchUser(1);
console.log('user:', user.name);

// 2) Promise.all은 튜플의 자리별 타입을 지킨다 — [User, number[], string]
const [u, counts, label] = await Promise.all([fetchUser(2), Promise.resolve([1, 2, 3]), 'done']);
console.log('all:', u.name, counts.length, label);

// 3) Awaited — Promise를 벗긴 타입
type Loaded = Awaited<ReturnType<typeof fetchUser>>;   // User
const loaded: Loaded = { id: 9, name: 'typed' };
console.log('Awaited:', loaded.name);

// 4) Promise.allSettled — 일부가 실패해도 모두 기다린다. status로 좁힌다
const settled = await Promise.allSettled([fetchUser(1), Promise.reject(new Error('404'))]);
for (const r of settled) {
  console.log('settled:', r.status === 'fulfilled' ? r.value.name : (r.reason as Error).message);
}

// 5) 타임아웃 — 시간이 지나면 signal로 작업도 함께 멈춘다
try {
  await withTimeout((signal) => fetchUser(10, signal), 50);
} catch (error) {
  console.log('timeout:', error instanceof TimeoutError ? error.message : error);
}

// 6) 동시 실행 제한 — 최대 2개씩, 결과 순서는 입력 순서
const started = Date.now();
const users = await mapLimit([1, 2, 3, 4], 2, (id) => fetchUser(id));
console.log('mapLimit:', users.map((x) => x.name).join(', '), `(${Date.now() - started >= 100 ? '100ms 이상' : '빠름'})`);
