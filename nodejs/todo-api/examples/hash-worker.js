// 섹션: CPU 작업과 Worker Threads
import { parentPort, workerData } from 'node:worker_threads';
import { pbkdf2Sync } from 'node:crypto';

// Worker 안에서는 동기 함수를 써도 메인 스레드가 막히지 않는다
const hash = pbkdf2Sync(workerData.password, workerData.salt, 600_000, 32, 'sha256');
parentPort.postMessage(hash.toString('hex'));
