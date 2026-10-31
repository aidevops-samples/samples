// 가이드 "유니온과 식별 유니온", "타입 좁히기"
export type Circle   = { kind: 'circle'; radius: number };
export type Square   = { kind: 'square'; side: number };
export type Triangle = { kind: 'triangle'; base: number; height: number };
export type Shape = Circle | Square | Triangle;

// 모든 경우를 처리했는지 컴파일러가 확인하게 하는 함수.
// Shape에 새 멤버를 추가하고 switch에 case를 빠뜨리면 default의 assertNever 호출이 타입 오류가 된다.
export function assertNever(value: never): never {
  throw new Error(`처리하지 않은 값: ${JSON.stringify(value)}`);
}

export function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':   return Math.PI * shape.radius ** 2;   // shape: Circle
    case 'square':   return shape.side ** 2;               // shape: Square
    case 'triangle': return (shape.base * shape.height) / 2;
    default:         return assertNever(shape);            // shape: never
  }
}

// 커스텀 타입 가드 — 반환 타입의 `shape is Circle`이 호출한 쪽의 타입을 좁힌다
export function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}
