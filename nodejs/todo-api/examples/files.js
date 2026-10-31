// 섹션: 파일 시스템과 스트림 — 작은 파일
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dir = join(import.meta.dirname, 'data');
await mkdir(dir, { recursive: true });

await writeFile(join(dir, 'config.json'), JSON.stringify({ port: 3000 }, null, 2));
const config = JSON.parse(await readFile(join(dir, 'config.json'), 'utf8'));

console.log(config.port, await readdir(dir));
