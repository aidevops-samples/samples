// 가이드 "유틸리티 타입" — node examples/utility.ts
import { UserStore, toPublic, resolveConfig, countByRole } from '../src/users.ts';

const store = new UserStore();
const kim = store.create({ name: '김개발', email: 'kim@example.com', password: 's3cret', role: 'admin' });
const lee = store.create({ name: '이운영', email: 'lee@example.com', password: 'p@ss', role: 'member' });

// Partial — 바꿀 필드만 보낸다
const updated = store.update(kim.id, { name: '김리드' });
console.log('update:', updated?.name);

// Omit — 응답에서 password를 뺀다
if (updated) console.log('public:', toPublic(updated));

// Pick — 목록에는 id와 name만
console.log('list:', store.list());

// Required — 기본값을 채운 뒤에는 모든 필드가 있다고 보장
const config = resolveConfig({ pageSize: 50 });
console.log('config:', config.pageSize, config.locale.toUpperCase());

// Record — 역할별 개수
console.log('roles:', countByRole([kim, lee]));
