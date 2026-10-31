# AIDevOps Samples

[aidevops.kr](https://aidevops.kr) 기술 가이드의 예제 코드를 바로 실행할 수 있게 모은 저장소입니다.
가이드 본문에 나온 코드를 그대로 옮기고, 실행에 필요한 설정 파일과 테스트를 더했습니다.

| 기술 | 경로 | 가이드 | 실행 환경 |
|---|---|---|---|
| Node.js | [`nodejs/todo-api`](nodejs/todo-api) | [Node.js 가이드](https://aidevops.kr/learn/nodejs/) | Node.js 24 LTS |
| Python | [`python/python-basic`](python/python-basic) | [Python 기본 가이드](https://aidevops.kr/learn/python/) | Python 3.12 이상 |

가이드가 추가되는 대로 같은 구조로 늘려 갑니다.

## 빠르게 실행하기

```bash
git clone https://github.com/<owner>/aidevops-samples.git
cd aidevops-samples

# Node.js
cd nodejs/todo-api
npm ci
npm test
npm run dev

# Python (uv 사용)
cd python/python-basic
uv sync
uv run pytest
uv run python -m app.cli
```

각 디렉터리의 README에 가이드 섹션과 파일의 대응표가 있습니다.

## 저장소 구조 규칙

- 기술마다 최상위 디렉터리 하나를 두고, 그 안에 실행 가능한 프로젝트를 둡니다.
- 프로젝트 하나는 다른 디렉터리에 기대지 않고 혼자 설치·실행·테스트할 수 있어야 합니다.
- `src/` 또는 `app/`에는 가이드가 완성해 가는 프로젝트 코드를, `examples/`에는 섹션별로 따로 실행해 보는 짧은 코드를 둡니다.
- 가이드 본문의 코드와 이 저장소의 코드가 다르면 버그입니다. 이슈로 알려 주세요.

## 기여

오타, 동작하지 않는 예제, 버전 업데이트에 따른 변경은 이슈나 PR로 보내 주세요.
PR을 보내기 전에 해당 프로젝트의 테스트를 실행해 통과하는지 확인해 주세요.

## 라이선스

[MIT](LICENSE)
