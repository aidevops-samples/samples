// 섹션: 파일 시스템과 스트림 — 큰 파일을 한 줄씩 읽기 (먼저 node examples/make-log.js 실행)
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';
import { join } from 'node:path';

let errors = 0;
const lines = createInterface({
  input: createReadStream(join(import.meta.dirname, 'access.log')),
  crlfDelay: Infinity,
});

for await (const line of lines) {
  if (line.includes(' 500 ')) errors++;
}
console.log('500 응답 수:', errors);
