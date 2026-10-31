// 섹션: 이벤트 루프 & 비동기 — 이벤트 루프가 막히는 것을 측정하기
import { monitorEventLoopDelay } from 'node:perf_hooks';

const histogram = monitorEventLoopDelay({ resolution: 10 });
histogram.enable();

// CPU를 붙잡는 동기 작업: 이 동안 다른 콜백은 하나도 실행되지 못한다
function blockFor(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end) {}
}

setTimeout(() => blockFor(300), 100);

setTimeout(() => {
  histogram.disable();
  console.log('이벤트 루프 최대 지연(ms):', Math.round(histogram.max / 1e6));
}, 1000);

// 출력: 이벤트 루프 최대 지연(ms): 300 근처
