FROM node:24-slim

ENV NODE_ENV=production
WORKDIR /app

# 의존성 목록만 먼저 복사 → 소스만 바뀌면 이 단계는 캐시를 사용한다
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY src ./src

USER node
EXPOSE 3000

# npm start가 아니라 node를 직접 실행해야 SIGTERM이 전달된다
CMD ["node", "src/server.js"]
