// 섹션: CPU 작업과 Worker Threads
import { Worker } from 'node:worker_threads';

export function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL('./hash-worker.js', import.meta.url), {
      workerData: { password, salt },
    });
    worker.once('message', resolve);
    worker.once('error', reject);
    worker.once('exit', (code) => {
      if (code !== 0) reject(new Error(`worker가 코드 ${code}로 종료되었습니다`));
    });
  });
}

const timer = setInterval(() => console.log('이벤트 루프는 계속 돌고 있습니다'), 50);
const hash = await hashPassword('secret', 'salt');
clearInterval(timer);
console.log(hash.slice(0, 16));
