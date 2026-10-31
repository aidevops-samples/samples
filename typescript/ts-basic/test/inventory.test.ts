import { test } from 'node:test';
import assert from 'node:assert/strict';
import { InMemoryRepository, Inventory, MemoryNotifier, type Product } from '../src/inventory.ts';

function setup() {
  const inventory = new Inventory(new InMemoryRepository<Product>());
  inventory.add({ id: 'p1', name: '키보드', stock: 5 });
  inventory.add({ id: 'p2', name: '마우스', stock: 1 });
  return inventory;
}

test('take는 재고를 줄이고 바뀐 상품을 돌려준다', () => {
  const inventory = setup();
  assert.equal(inventory.take('p1', 2).stock, 3);
  assert.equal(inventory.take('p1', 3).stock, 0);
});

test('재고가 부족하거나 없는 상품이면 던진다', () => {
  const inventory = setup();
  assert.throws(() => inventory.take('p2', 2), /재고 부족: 마우스/);
  assert.throws(() => inventory.take('nope', 1), /상품 nope이\(가\) 없습니다/);
});

test('음수 재고는 추가할 수 없다', () => {
  assert.throws(() => setup().add({ id: 'x', name: 'x', stock: -1 }), RangeError);
});

test('lowStock은 기준 이하 상품만', () => {
  assert.deepEqual(setup().lowStock(1).map((p) => p.id), ['p2']);
});

test('추상 클래스의 notifyAll은 하위 클래스의 send를 모두 부른다', async () => {
  const notifier = new MemoryNotifier();
  assert.equal(await notifier.notifyAll(['a', 'b'], 'hi'), 2);
  assert.deepEqual(notifier.sent, ['a: hi', 'b: hi']);
});

test('#private 필드는 프로퍼티로 보이지 않는다', () => {
  const repo = new InMemoryRepository<Product>();
  repo.save({ id: 'p', name: 'p', stock: 1 });
  assert.deepEqual(Object.keys(repo), []);
  assert.equal(repo.list().length, 1);
});
