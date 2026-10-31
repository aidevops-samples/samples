import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mapLimit, sleep, TimeoutError, withTimeout } from '../src/async.ts';

test('withTimeout은 제때 끝나면 결과를, 늦으면 TimeoutError를', async () => {
  assert.equal(await withTimeout(async () => 'ok', 100), 'ok');
  await assert.rejects(withTimeout((signal) => sleep(1_000, signal), 20), TimeoutError);
});

test('withTimeout은 시간이 지나면 작업에 중단 신호를 보낸다', async () => {
  let aborted = false;
  await assert.rejects(withTimeout((signal) => {
    signal.addEventListener('abort', () => { aborted = true; });
    return sleep(1_000, signal);
  }, 20));
  assert.equal(aborted, true);
});

test('sleep은 이미 중단된 signal이면 바로 거부한다', async () => {
  await assert.rejects(sleep(10, AbortSignal.abort(new Error('취소'))), /취소/);
});

test('mapLimit은 동시 실행 수를 지키고 순서를 유지한다', async () => {
  let running = 0;
  let peak = 0;
  const result = await mapLimit([30, 10, 20, 5], 2, async (ms, i) => {
    running++;
    peak = Math.max(peak, running);
    await sleep(ms);
    running--;
    return i;
  });
  assert.deepEqual(result, [0, 1, 2, 3]);
  assert.equal(peak, 2);
});

test('mapLimit은 빈 배열이면 빈 배열', async () => {
  assert.deepEqual(await mapLimit([], 3, async (x) => x), []);
});
