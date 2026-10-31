import { AsyncLocalStorage } from 'node:async_hooks';
import { randomUUID } from 'node:crypto';

const context = new AsyncLocalStorage();

// 요청마다 ID를 만들어 그 요청의 모든 비동기 작업에서 읽을 수 있게 한다
export function requestContext(req, res, next) {
  const requestId = req.get('x-request-id') ?? randomUUID();
  res.set('x-request-id', requestId);
  context.run({ requestId }, next);
}

export function log(level, message, fields = {}) {
  console.log(JSON.stringify({
    time: new Date().toISOString(),
    level,
    requestId: context.getStore()?.requestId,
    message,
    ...fields,
  }));
}

// 사용: app.use(requestContext);  log('info', '주문 조회', { orderId: 42 });
// {"time":"...","level":"info","requestId":"5fa4fa3a-...","message":"주문 조회","orderId":42}
