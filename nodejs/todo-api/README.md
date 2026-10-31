# Node.js — Todo API

[aidevops.kr Node.js 가이드](https://aidevops.kr/learn/nodejs/)를 따라 완성되는 Express 5 Todo API와 섹션별 예제입니다.
Node.js 24 LTS, Express 5, zod 4 기준입니다.

## 실행

```bash
nvm use            # 또는 fnm use (.nvmrc = 24)
npm ci
cp .env.example .env

npm run dev        # http://localhost:3000, 파일이 바뀌면 재시작
npm test           # node:test 실행
```

```bash
curl -s -X POST localhost:3000/todos -H 'content-type: application/json' -d '{"title":"가이드 읽기"}'
# {"id":1,"title":"가이드 읽기","done":false}

curl -s localhost:3000/todos/999
# {"error":"할 일을 찾을 수 없습니다"}
```

## Docker

```bash
docker build -t todo-api:1.0 .
docker run --rm -p 3000:3000 --name todo-api todo-api:1.0
docker stop todo-api      # SIGTERM → "SIGTERM 수신, 종료를 시작합니다"
```

## 가이드 섹션과 파일

| 가이드 섹션 | 파일 | 실행 |
|---|---|---|
| npm & package.json | `package.json` | `npm ci` |
| 내장 도구 — TypeScript 바로 실행 | `examples/greet.ts` | `node examples/greet.ts` |
| 이벤트 루프 & 비동기 | `examples/order.js`, `examples/block.js` | `node examples/order.js` |
| 비동기 오류 처리와 타임아웃 | `examples/reject.js`, `examples/fetch.js` | `node examples/fetch.js` (인터넷 필요) |
| 파일 시스템과 스트림 | `examples/files.js`, `examples/gzip.js`, `examples/lines.js` | `node examples/make-log.js` 후 `node examples/gzip.js` |
| HTTP 서버와 fetch | `examples/http.js`, `examples/client.js` | `node examples/http.js` |
| Express 5로 API 서버 만들기 | `src/app.js` | `npm run dev` |
| 설정과 환경 변수 | `src/config.js`, `.env.example` | `PORT=abc node src/server.js` → 종료 코드 1 |
| CPU 작업과 Worker Threads | `examples/hash.js`, `examples/hash-worker.js` | `node examples/hash.js` |
| 테스트 — node:test | `test/todos.test.js` | `npm test` |
| 운영 — 종료 처리와 로깅 | `src/server.js`, `src/logger.js`, `test/logger.test.js` | `npm start` 후 Ctrl+C |
| Docker로 배포하기 | `Dockerfile`, `.dockerignore` | `docker build -t todo-api .` |

`examples/reject.js`는 처리하지 않은 Promise 거부로 프로세스가 종료되는 것을 보여 주는 예제라 일부러 실패합니다.

## 가이드 코드에 더한 것

- `test/todos.test.js`: 잘못된 JSON 본문(400)과 없는 경로(404) 테스트를 추가했습니다.
- `test/logger.test.js`: 요청 ID가 비동기 경계를 넘어서도 로그에 남는지 확인합니다.
- `examples/make-log.js`: 스트림 예제에서 읽을 `access.log`를 만듭니다.

## 다음 연습

가이드의 마지막 섹션처럼, 메모리 `Map` 대신 PostgreSQL을 연결하고 테스트와 Docker 배포까지 다시 끝내 보세요.
`createApp({ todos })`가 저장소를 주입받도록 되어 있어서, 같은 인터페이스를 가진 저장소 객체로 바꿔 끼우면 됩니다.
