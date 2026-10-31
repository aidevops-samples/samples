// 가이드 "비동기 코드의 타입" — Promise, 취소(AbortSignal), 타임아웃, 동시 실행 제한

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(signal.reason);
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(signal.reason);
    }, { once: true });
  });
}

export class TimeoutError extends Error {
  constructor(ms: number) {
    super(`${ms}ms 안에 끝나지 않았습니다`);
    this.name = 'TimeoutError';
  }
}

// 작업에 signal을 넘겨서, 시간이 지나면 기다리기만 멈추는 게 아니라 작업 자체도 멈추게 한다
export async function withTimeout<T>(task: (signal: AbortSignal) => Promise<T>, ms: number): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(new TimeoutError(ms)), ms);
  try {
    return await task(controller.signal);
  } finally {
    clearTimeout(timer);
  }
}

// 최대 limit개씩만 동시에 실행하고, 결과는 입력 순서대로 돌려준다
export async function mapLimit<T, R>(items: readonly T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let next = 0;
  async function worker(): Promise<void> {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index] as T, index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
