// 가이드 "Branded 타입으로 도메인 모델링" — 런타임 모양은 같지만 섞이면 안 되는 값을 구분한다

declare const brand: unique symbol;
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type UserId  = Brand<string, 'UserId'>;
export type OrderId = Brand<string, 'OrderId'>;
export type Won     = Brand<number, 'Won'>;

// Brand 값은 검증하는 함수에서만 만든다 — 이 함수를 거친 값만 UserId가 된다
export function toUserId(raw: string): UserId {
  if (!/^u_[a-z0-9]+$/.test(raw)) throw new Error(`UserId 형식이 아닙니다: ${raw}`);
  return raw as UserId;
}

export function toOrderId(raw: string): OrderId {
  if (!/^o_[a-z0-9]+$/.test(raw)) throw new Error(`OrderId 형식이 아닙니다: ${raw}`);
  return raw as OrderId;
}

export function won(amount: number): Won {
  if (!Number.isInteger(amount) || amount < 0) throw new RangeError(`금액은 0 이상의 정수여야 합니다: ${amount}`);
  return amount as Won;
}

export function addWon(a: Won, b: Won): Won {
  return won(a + b);
}

export type Order = {
  id: OrderId;
  userId: UserId;
  total: Won;
};

export function createOrder(id: OrderId, userId: UserId, prices: readonly Won[]): Order {
  return { id, userId, total: prices.reduce(addWon, won(0)) };
}
