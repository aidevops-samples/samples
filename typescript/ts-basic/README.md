# TypeScript — 기본 예제

[aidevops.kr TypeScript 가이드](https://aidevops.kr/learn/typescript/)의 코드를 섹션별로 옮기고 테스트를 붙인 프로젝트입니다.
Node.js 24 LTS, TypeScript 5.9 기준입니다.

가이드는 `ts-node`로 실행하는 방법을 소개하지만, 이 프로젝트는 Node.js 24의 내장 타입 제거(type stripping)로 `.ts` 파일을 바로 실행합니다. 따로 빌드하거나 `ts-node`를 설치할 필요가 없습니다. 타입 검사는 `tsc`가 맡습니다.

## 실행

```bash
nvm use               # 또는 fnm use (.nvmrc = 24)
npm ci

npm run typecheck     # tsc — 타입 검사만, 파일은 만들지 않음
npm test              # node:test
npm run examples      # examples/*.ts 전체 실행

node examples/narrowing.ts   # 하나씩 실행
```

## 가이드 섹션과 파일

| 가이드 섹션 | 파일 | 실행 |
|---|---|---|
| 프로젝트 설정 | `tsconfig.json`, `examples/setup.ts` | `node examples/setup.ts` |
| 타입 시스템 | `src/result.ts`, `examples/types.ts` | `node examples/types.ts` |
| 타입 좁히기 (Narrowing) | `src/shapes.ts`, `examples/narrowing.ts` | `node examples/narrowing.ts` |
| 제네릭 | `src/generics.ts`, `examples/generics.ts` | `node examples/generics.ts` |
| 유틸리티 타입 | `src/users.ts`, `examples/utility.ts` | `node examples/utility.ts` |

테스트는 `test/`에 섹션마다 하나씩 있습니다.

## tsconfig.json에서 가이드와 다른 점

가이드의 핵심 값(`strict: true`, `target: "ES2022"`)은 그대로이고, Node.js가 `.ts`를 직접 실행하도록 몇 가지를 더했습니다.

| 설정 | 이유 |
|---|---|
| `"module"`·`"moduleResolution": "nodenext"` | 번들러 없이 Node.js가 실행하므로 Node 규칙으로 모듈을 찾습니다. Vite·esbuild를 쓴다면 가이드처럼 `"bundler"`가 맞습니다 |
| `"noEmit"`, `"allowImportingTsExtensions"` | `import ... from './result.ts'`처럼 확장자를 그대로 쓰고, tsc는 검사만 합니다 |
| `"erasableSyntaxOnly"` | 타입 제거만으로 실행할 수 없는 문법(`enum`, `namespace`, 생성자 매개변수 프로퍼티)을 막습니다 |
| `"verbatimModuleSyntax"` | 타입만 가져올 때 `import type`을 쓰게 해서, 실행 시 지워질 import를 분명히 합니다 |
| `"noUncheckedIndexedAccess"` | `arr[0]`, `record[key]`의 타입에 `undefined`를 포함시켜 빠진 값을 놓치지 않게 합니다 |
