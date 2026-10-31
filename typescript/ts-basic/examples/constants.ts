// 가이드 "enum 대신 as const" — node examples/constants.ts
import { isLogLevel, LOG_LEVELS, LogLevel, ROLES, shouldLog, type Role } from '../src/constants.ts';

// 값으로 쓸 때는 객체 프로퍼티로, 타입으로 쓸 때는 같은 이름의 타입으로
const minimum: LogLevel = LogLevel.Info;
console.log('levels:', LOG_LEVELS.join(', '));

for (const level of LOG_LEVELS) {
  console.log(`${level.padEnd(5)} → ${shouldLog(level, minimum) ? '출력' : '생략'}`);
}

// 환경 변수처럼 바깥에서 온 문자열은 가드로 좁힌다
for (const raw of ['warn', 'verbose']) {
  console.log(`LOG_LEVEL=${raw}:`, isLogLevel(raw) ? `유효 (${raw})` : '알 수 없는 값');
}

// 배열 + as const — 목록과 타입을 한 번에
const role: Role = 'member';
// const wrong: Role = 'owner';   // TS2322
console.log('roles:', ROLES, '/ 현재:', role);

// 문자열 리터럴 유니온은 enum처럼 자동 완성되고, 값 자체가 읽기 쉬운 문자열이라 로그·JSON에도 그대로 남는다
console.log(JSON.stringify({ level: LogLevel.Warn, role }));
