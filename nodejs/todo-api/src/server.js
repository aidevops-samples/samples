import { config } from './config.js';
import { createApp } from './app.js';

const app = createApp();
const server = app.listen(config.PORT, () => {
  console.log(`http://localhost:${config.PORT} 에서 실행 중`);
});

function shutdown(signal) {
  console.log(`${signal} 수신, 종료를 시작합니다`);

  // 새 연결을 받지 않고, 처리 중인 요청이 끝나면 콜백이 호출된다
  server.close((err) => {
    // 여기서 DB 연결 풀 등을 닫는다
    process.exit(err ? 1 : 0);
  });
  server.closeIdleConnections();   // 요청이 없는 keep-alive 연결은 바로 닫는다

  // 10초 안에 끝나지 않으면 강제 종료
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
