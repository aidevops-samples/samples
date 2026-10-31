// 가이드 "타입 좁히기 (Narrowing)"
export type Circle = { kind: 'circle'; radius: number };
export type Square = { kind: 'square'; side: number };
export type Shape = Circle | Square;

export function area(shape: Shape): number {
  // 'kind' 필드로 분기하면 각 블록 안에서 타입이 자동으로 좁혀짐
  if (shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2;   // 여기서는 shape가 Circle로 좁혀짐
  }
  return shape.side ** 2;                  // 여기서는 Square로 좁혀짐
}

// 커스텀 타입 가드 — is 키워드로 타입을 확정
export function isCircle(shape: Shape): shape is Circle {
  return shape.kind === 'circle';
}
