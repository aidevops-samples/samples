// gzip.js, lines.js에서 읽을 access.log를 만든다 (10만 줄)
import { createWriteStream } from 'node:fs';
import { once } from 'node:events';
import { join } from 'node:path';

const out = createWriteStream(join(import.meta.dirname, 'access.log'));
const statuses = [200, 200, 200, 201, 304, 404, 500];

for (let i = 0; i < 100_000; i++) {
  const status = statuses[i % statuses.length];
  const line = `127.0.0.1 - - [31/Oct/2026:10:00:00 +0900] "GET /todos/${i} HTTP/1.1" ${status} 42\n`;
  // 쓰기 버퍼가 가득 차면 비워질 때까지 기다린다 (배압 처리)
  if (!out.write(line)) await once(out, 'drain');
}
out.end();
await once(out, 'finish');
console.log('access.log 생성 완료');
