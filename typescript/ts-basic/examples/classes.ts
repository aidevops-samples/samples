// 가이드 "클래스" — node examples/classes.ts
import { InMemoryRepository, Inventory, MemoryNotifier, type Product } from '../src/inventory.ts';

const repo = new InMemoryRepository<Product>();
const inventory = new Inventory(repo);

inventory.add({ id: 'p1', name: '키보드', stock: 5 });
inventory.add({ id: 'p2', name: '마우스', stock: 2 });
inventory.add({ id: 'p3', name: '모니터', stock: 10 });

const updated = inventory.take('p1', 4);
console.log(`출고 후 ${updated.name}: ${updated.stock}개`);

try {
  inventory.take('p2', 3);
} catch (error) {
  console.log('출고 실패:', (error as Error).message);
}

const low = inventory.lowStock(2);
console.log('재고 부족:', low.map((p) => `${p.name}(${p.stock})`).join(', '));

// 추상 클래스의 공통 흐름(notifyAll) + 하위 클래스의 구현(send)
const notifier = new MemoryNotifier();
const count = await notifier.notifyAll(['ops@example.com', 'lead@example.com'], `재고 부족 ${low.length}건`);
console.log(`알림 ${count}건:`, notifier.sent);

// #private 필드는 런타임에도 숨겨진다 — 프로퍼티 목록에 나오지 않는다
console.log('repo의 키:', Object.keys(repo));
// repo.#items;               // 문법 오류 — 클래스 밖에서는 # 필드에 접근할 수 없다
