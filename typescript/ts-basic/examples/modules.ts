// 가이드 "모듈과 선언 파일" — node examples/modules.ts

// 1) 타입만 가져올 때는 import type — 실행 시 지워진다는 것이 코드에 드러난다 (verbatimModuleSyntax)
import type { Product } from '../src/inventory.ts';
// 값과 타입을 함께 가져올 때는 type을 이름 앞에 붙인다
import { parse, type Result } from '../src/result.ts';

// 2) JavaScript 모듈 + 선언 파일 — 타입은 slugify.d.ts에서, 구현은 slugify.js에서 온다
import { slugify, VERSION } from '../src/legacy/slugify.js';

const product: Product = { id: 'p1', name: 'TypeScript 입문 가이드', stock: 3 };
console.log('slug:', slugify(product.name), `(slugify v${VERSION})`);
console.log('slug:', slugify('  Hello, World!  ', '_'));
// slugify(123);              // TS2345 — 선언 파일에 text: string으로 적혀 있다

const parsed: Result<number> = parse('7');
console.log('parse:', parsed);
