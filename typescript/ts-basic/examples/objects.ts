// 가이드 "객체 타입 — interface와 type" — node examples/objects.ts

// 1) interface — 객체 모양. extends로 확장한다
interface Animal {
  readonly id: number;   // 만든 뒤에는 바꿀 수 없음
  name: string;
  age?: number;          // 없어도 됨
}
interface Dog extends Animal {
  breed: string;
}

// 2) type — 유니온·교차·튜플 등 모든 타입에 이름을 붙인다
type Status = 'active' | 'inactive';
type WithStatus<T> = T & { status: Status };

const dog: WithStatus<Dog> = { id: 1, name: '바둑이', breed: '진돗개', status: 'active' };
// dog.id = 2;              // TS2540: 읽기 전용 프로퍼티
console.log(dog.name, dog.age ?? '나이 미상', dog.status);

// 3) 구조적 타입 — 이름이 아니라 모양이 같으면 호환된다
type Point = { x: number; y: number };
function distance(p: Point): number {
  return Math.hypot(p.x, p.y);
}
const pixel = { x: 3, y: 4, color: 'red' };
console.log('distance:', distance(pixel));   // 변수로 넘기면 남는 프로퍼티(color)가 있어도 된다

// 4) 초과 프로퍼티 검사 — 객체 리터럴을 바로 넘길 때만 오타를 잡는다
// distance({ x: 3, y: 4, colour: 'red' });  // TS2353: 'colour'는 Point에 없음

// 5) 인덱스 시그니처와 Record — 키를 미리 알 수 없는 객체
const visits: Record<string, number> = { home: 10, about: 3 };
visits['pricing'] = (visits['pricing'] ?? 0) + 1;  // noUncheckedIndexedAccess라 ?? 0이 필요
console.log(visits);

// 6) 선택적 체이닝 — 중간 값이 없을 수 있는 중첩 객체
type Company = { name: string; address?: { city: string; zip?: string } };
const companies: Company[] = [{ name: 'A', address: { city: '서울' } }, { name: 'B' }];
for (const c of companies) {
  console.log(`${c.name}: ${c.address?.city ?? '주소 없음'} ${c.address?.zip ?? ''}`.trim());
}

// 7) interface 선언 병합 — 같은 이름으로 다시 선언하면 멤버가 합쳐진다 (라이브러리 확장에 쓰임)
interface Settings { theme: string }
interface Settings { fontSize: number }
const settings: Settings = { theme: 'dark', fontSize: 14 };
console.log(settings);
