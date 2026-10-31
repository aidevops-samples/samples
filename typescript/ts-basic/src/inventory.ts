// 가이드 "클래스" — 인터페이스 구현, 접근 제한, 추상 클래스

export interface Entity {
  readonly id: string;
}

export interface Repository<T extends Entity> {
  findById(id: string): T | undefined;
  save(item: T): void;
  list(): T[];
}

// implements — 인터페이스의 모든 멤버를 갖췄는지 컴파일러가 확인한다
export class InMemoryRepository<T extends Entity> implements Repository<T> {
  // #items는 JavaScript의 진짜 private 필드라 런타임에도 밖에서 접근할 수 없다
  #items = new Map<string, T>();

  findById(id: string): T | undefined {
    return this.#items.get(id);
  }

  save(item: T): void {
    this.#items.set(item.id, item);
  }

  list(): T[] {
    return [...this.#items.values()];
  }
}

export type Product = Entity & { name: string; stock: number };

export class Inventory {
  // private은 TypeScript 검사에서만 막는다 (컴파일된 JS에서는 보통 프로퍼티)
  private readonly repo: Repository<Product>;

  // 생성자 매개변수 프로퍼티(constructor(private repo: ...))는 타입만 지워서는 실행할 수 없어
  // erasableSyntaxOnly 설정에서 금지된다. 필드를 선언하고 생성자에서 대입한다.
  constructor(repo: Repository<Product>) {
    this.repo = repo;
  }

  add(product: Product): void {
    if (product.stock < 0) throw new RangeError('재고는 0 이상이어야 합니다');
    this.repo.save(product);
  }

  take(id: string, quantity: number): Product {
    const product = this.repo.findById(id);
    if (!product) throw new Error(`상품 ${id}이(가) 없습니다`);
    if (product.stock < quantity) throw new Error(`재고 부족: ${product.name} (${product.stock}개 남음)`);
    const updated = { ...product, stock: product.stock - quantity };
    this.repo.save(updated);
    return updated;
  }

  lowStock(threshold: number): Product[] {
    return this.repo.list().filter((p) => p.stock <= threshold);
  }
}

// 추상 클래스 — 공통 흐름은 여기서 구현하고, 달라지는 부분(send)만 하위 클래스가 채운다
export abstract class Notifier {
  abstract send(to: string, message: string): Promise<void>;

  async notifyAll(recipients: readonly string[], message: string): Promise<number> {
    await Promise.all(recipients.map((to) => this.send(to, message)));
    return recipients.length;
  }
}

export class MemoryNotifier extends Notifier {
  readonly sent: string[] = [];

  // override — 부모에 없는 메서드 이름을 쓰면 오류 (noImplicitOverride)
  override async send(to: string, message: string): Promise<void> {
    this.sent.push(`${to}: ${message}`);
  }
}
