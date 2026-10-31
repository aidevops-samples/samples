import express from 'express';
import { z } from 'zod';

// 요청 본문의 형태를 정의하고 검증에 사용한다
const todoInput = z.object({
  title: z.string().trim().min(1).max(200),
  done: z.boolean().default(false),
});

class HttpError extends Error {
  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function createApp({ todos = new Map() } = {}) {
  const app = express();
  let nextId = 1;

  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));   // 본문 크기 제한

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/todos', (req, res) => {
    res.json([...todos.values()]);
  });

  app.post('/todos', (req, res) => {
    const result = todoInput.safeParse(req.body);
    if (!result.success) {
      throw new HttpError(400, '입력값이 올바르지 않습니다', z.flattenError(result.error).fieldErrors);
    }
    const todo = { id: nextId++, ...result.data };
    todos.set(todo.id, todo);
    res.status(201).json(todo);
  });

  // async 핸들러에서 던진 오류도 오류 처리 미들웨어로 전달된다 (Express 5)
  app.get('/todos/:id', async (req, res) => {
    const todo = todos.get(Number(req.params.id));
    if (!todo) throw new HttpError(404, '할 일을 찾을 수 없습니다');
    res.json(todo);
  });

  // 어떤 라우트에도 걸리지 않은 요청
  app.use((req, res) => {
    res.status(404).json({ error: '존재하지 않는 경로입니다' });
  });

  // 오류 처리 미들웨어: 인자가 4개여야 하고 맨 마지막에 등록한다
  app.use((err, req, res, next) => {
    // express.json()이 던진 본문 파싱 오류(잘못된 JSON, 크기 초과)는 status를 갖고 있다
    const status = err.status ?? 500;
    if (status >= 500) console.error(err);
    res.status(status).json({
      error: status >= 500 ? '서버 오류가 발생했습니다' : err.message,
      details: err.details,
    });
  });

  return app;
}
