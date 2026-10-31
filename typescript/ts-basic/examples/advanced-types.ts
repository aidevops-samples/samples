// 가이드 "고급 타입" — node examples/advanced-types.ts
import { buildPath, createGetters, type DeepReadonly, type ElementOf, type RouteParams } from '../src/advanced.ts';
import { TypedEmitter } from '../src/events.ts';

// 1) keyof · typeof · 인덱스 접근 타입 — 값에서 타입을 뽑아 쓴다
const defaults = { theme: 'light', fontSize: 14, autosave: true };
type Settings = typeof defaults;                 // { theme: string; fontSize: number; autosave: boolean }
type SettingKey = keyof Settings;                // 'theme' | 'fontSize' | 'autosave'
type FontSize = Settings['fontSize'];            // number

function getSetting<K extends SettingKey>(key: K): Settings[K] {
  return defaults[key];
}
const size: FontSize = getSetting('fontSize');
console.log('fontSize:', size, '/ theme:', getSetting('theme'));

// 2) 매핑된 타입 + 키 이름 바꾸기 — getTheme(), getFontSize() ...
const getters = createGetters(defaults);
console.log('getters:', getters.getTheme(), getters.getFontSize(), getters.getAutosave());

// 3) DeepReadonly — 중첩된 프로퍼티까지 바꿀 수 없다
const frozen: DeepReadonly<{ db: { host: string; ports: number[] } }> = { db: { host: 'localhost', ports: [5432] } };
// frozen.db.host = 'x';      // TS2540
// frozen.db.ports.push(1);   // TS2339 — readonly 배열에는 push가 없다
console.log('readonly:', frozen.db.host, frozen.db.ports);

// 4) infer — 배열 요소 타입
const tags = ['ts', 'node'] as const;
type Tag = ElementOf<typeof tags>;               // 'ts' | 'node'
const tag: Tag = 'ts';
console.log('tag:', tag);

// 5) 템플릿 리터럴 타입 — 경로 문자열에서 매개변수 이름을 뽑아 필수로 만든다
type Params = RouteParams<'/users/:userId/posts/:postId'>;   // 'userId' | 'postId'
const params: Record<Params, number> = { userId: 7, postId: 42 };
console.log('path:', buildPath('/users/:userId/posts/:postId', params));
// buildPath('/users/:userId', {});              // TS2741 — userId가 빠짐
// buildPath('/users/:userId', { id: 1 });       // TS2353 — id가 아니라 userId

// 6) 타입이 붙은 이벤트 — 이벤트 이름마다 인자 타입이 다르다
type AppEvents = {
  login: [userId: string, at: Date];
  logout: [];
  error: [error: Error];
};
const bus = new TypedEmitter<AppEvents>();
bus.on('login', (userId, at) => console.log(`login: ${userId} @ ${at.toISOString().slice(0, 10)}`));
bus.on('logout', () => console.log('logout'));
bus.emit('login', 'u_kim', new Date('2026-10-31'));
bus.emit('logout');
// bus.emit('login');        // TS2554 — 인자가 부족함
// bus.emit('signup');       // TS2345 — 없는 이벤트
