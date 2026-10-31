# TypeScript — 가이드 예제

[aidevops.kr TypeScript 가이드](https://aidevops.kr/learn/typescript/)의 코드를 섹션별로 옮기고 테스트를 붙인 프로젝트입니다.
Node.js 24 LTS, TypeScript 7.0(Go로 다시 작성한 네이티브 컴파일러) 기준입니다.

Node.js 24는 `.ts` 파일의 타입 표기를 지우고 바로 실행합니다(type stripping). 그래서 이 프로젝트는 빌드 단계가 없고 `ts-node`도 쓰지 않습니다. 타입 검사는 `tsc`가 따로 맡습니다.

설치 없이 먼저 돌려 보고 싶다면 [TypeScript 웹 IDE의 샘플 저장소 모드](https://aidevops.kr/learn/typescript/ide/#sample)를 여세요. 이 디렉터리를 GitHub에서 바로 불러와 브라우저에서 예제와 테스트를 실행합니다.

## 실행

```bash
nvm use               # 또는 fnm use (.nvmrc = 24)
npm ci

npm run typecheck     # tsc — 타입 검사만, 파일은 만들지 않음 (타입 테스트 포함)
npm test              # node:test
npm run examples      # examples/*.ts 전체 실행

node examples/narrowing.ts   # 하나씩 실행
```

## 가이드 섹션과 파일

| 가이드 섹션 | 본문 코드 | 예제 | 테스트 |
|---|---|---|---|
| 프로젝트 설정과 실행 | `tsconfig.json` | `examples/setup.ts` | |
| 기본 타입과 추론 | | `examples/basics.ts` | |
| 함수 타입 | | `examples/functions.ts` | |
| 객체 타입 — interface와 type | | `examples/objects.ts` | |
| 유니온과 식별 유니온 | `src/result.ts`, `src/shapes.ts` | `examples/unions.ts` | `result`, `shapes` |
| 타입 좁히기 | `src/shapes.ts`, `src/validate.ts` | `examples/narrowing.ts` | `shapes` |
| unknown과 외부 데이터 경계 | `src/validate.ts` | `examples/unknown.ts` | `validate` |
| 제네릭 | `src/generics.ts` | `examples/generics.ts` | `generics` |
| 유틸리티 타입 | `src/users.ts` | `examples/utility.ts` | `users` |
| 고급 타입 | `src/advanced.ts`, `src/events.ts` | `examples/advanced-types.ts` | `advanced` |
| 클래스 | `src/inventory.ts` | `examples/classes.ts` | `inventory` |
| enum 대신 as const | `src/constants.ts` | `examples/constants.ts` | `constants` |
| 모듈과 선언 파일 | `src/legacy/slugify.js`, `slugify.d.ts` | `examples/modules.ts` | |
| 비동기 코드의 타입 | `src/async.ts` | `examples/async.ts` | `async` |
| 오류 처리 | `src/errors.ts` | `examples/errors.ts` | `errors` |
| Branded 타입 | `src/domain.ts` | `examples/branded.ts` | `domain` |
| 테스트 — 런타임과 타입 | | | `types.test.ts` (tsc로 검사) |

테스트 열의 이름은 `test/<이름>.test.ts`입니다.

## 예제의 `// TS2322` 주석

예제에는 일부러 주석 처리한 줄이 있습니다.

```ts
// count = '1';             // TS2322: string은 number에 할당할 수 없음
```

앞의 `// `를 지우고 `npm run typecheck`를 실행하면 적힌 오류 코드가 그대로 나옵니다. 타입 검사가 무엇을 막아 주는지 직접 확인해 보세요.

## tsconfig.json에서 가이드와 다른 점

가이드의 핵심 값(`strict`, `target`)은 그대로이고, Node.js가 `.ts`를 직접 실행하도록 몇 가지를 더했습니다.

| 설정 | 이유 |
|---|---|
| `"module"`·`"moduleResolution": "nodenext"` | 번들러 없이 Node.js가 실행하므로 Node 규칙으로 모듈을 찾습니다. Vite·esbuild를 쓴다면 `"module": "preserve"`, `"moduleResolution": "bundler"`가 맞습니다 |
| `"noEmit"`, `"allowImportingTsExtensions"` | `import ... from './result.ts'`처럼 확장자를 그대로 쓰고, tsc는 검사만 합니다 |
| `"erasableSyntaxOnly"` | 타입 제거만으로 실행할 수 없는 문법(`enum`, `namespace`, 생성자 매개변수 프로퍼티)을 막습니다 |
| `"verbatimModuleSyntax"` | 타입만 가져올 때 `import type`을 쓰게 해서, 실행 시 지워질 import를 분명히 합니다 |
| `"noUncheckedIndexedAccess"` | `arr[0]`, `record[key]`의 타입에 `undefined`를 포함시켜 빠진 값을 놓치지 않게 합니다 |
| `"exactOptionalPropertyTypes"` | `a?: number`에 `undefined`를 직접 넣는 것을 막아, "키가 없음"과 "값이 undefined"를 구분합니다. TypeScript 7의 `tsc --init`도 켜는 값입니다 |
| `"noImplicitOverride"` | 부모 메서드를 덮어쓸 때 `override`를 쓰게 해서, 부모 쪽 이름이 바뀌면 오류로 알려 줍니다 |
