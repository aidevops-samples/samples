// 가이드 "Branded 타입으로 도메인 모델링" — node examples/branded.ts
import { createOrder, toOrderId, toUserId, won, type OrderId, type UserId } from '../src/domain.ts';

const userId = toUserId('u_kim');
const orderId = toOrderId('o_1001');

function cancelOrder(id: OrderId): string {
  return `주문 ${id} 취소`;
}

console.log(cancelOrder(orderId));
// cancelOrder(userId);       // TS2345 — UserId는 OrderId가 아니다 (둘 다 string인데도)
// cancelOrder('o_1001');     // TS2345 — 검증하지 않은 string도 안 된다

const order = createOrder(orderId, userId, [won(12_000), won(3_500)]);
console.log(`주문 ${order.id}: 사용자 ${order.userId}, 합계 ${order.total.toLocaleString('ko-KR')}원`);

// 런타임에서는 그냥 string·number라 JSON 직렬화·비교·연산이 그대로 된다
console.log(JSON.stringify(order));

// 검증 함수가 잘못된 값을 막는다
for (const raw of ['u_lee', 'admin', 'U_KIM']) {
  try {
    const id: UserId = toUserId(raw);
    console.log('유효한 UserId:', id);
  } catch (error) {
    console.log('거부:', (error as Error).message);
  }
}
try {
  won(-500);
} catch (error) {
  console.log('거부:', (error as Error).message);
}
