// 섹션: 파일 시스템과 스트림 — 큰 파일을 스트림으로 압축 (먼저 node examples/make-log.js 실행)
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';
import { join } from 'node:path';

const input = join(import.meta.dirname, 'access.log');

// 파일 크기와 상관없이 메모리 사용량이 일정합니다
await pipeline(
  createReadStream(input),
  createGzip(),
  createWriteStream(`${input}.gz`),
);
console.log('압축 완료');
