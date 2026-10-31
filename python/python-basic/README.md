# Python — python-basic

[aidevops.kr Python 기본 가이드](https://aidevops.kr/learn/python/)의 예제 프로젝트입니다.
가이드의 "모듈과 패키지" 섹션에서 만든 `src/app` 구조에 섹션별 예제와 pytest 테스트를 담았습니다.
Python 3.12 이상, uv 기준입니다.

## 실행

```bash
uv sync                       # .venv 생성 + uv.lock 기준 설치
uv run pytest                 # 테스트
uv run python -m app.cli      # 5
uv run python-basic           # pyproject.toml의 [project.scripts]로 등록한 같은 명령
```

uv 없이 실행하려면:

```bash
python -m venv .venv
source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -e . pytest
pytest
```

## 가이드 섹션과 파일

| 가이드 섹션 | 파일 |
|---|---|
| 변수와 기본 문법 | `examples/basics.py` |
| 자료구조 | `examples/collections_demo.py` |
| 컴프리헨션 & 제너레이터 | `examples/generators_demo.py` |
| 함수와 타입 힌트 | `examples/functions.py` |
| 데코레이터 | `examples/decorators.py` |
| 모듈과 패키지 | `src/app/calculator.py`, `src/app/cli.py` |
| 파일 입출력 | `examples/files.py` |
| 컨텍스트 매니저 & 자원 관리 | `examples/context_managers.py` |
| 예외 처리 | `examples/errors.py` |
| 클래스와 객체지향 | `examples/oop.py` |
| 타입 힌트 심화 | `examples/typing_advanced.py` |
| 표준 라이브러리 활용 | `examples/report.py`, `examples/orders.csv` |
| 동시성 기초 | `examples/concurrency_demo.py` |
| 패키지 관리 심화 (uv) | `pyproject.toml`, `uv.lock` |
| 테스트와 프로젝트 구조 | `tests/`, `src/app/weather.py` |

예제는 `uv run python examples/basics.py`처럼 하나씩 실행합니다.

## 가이드 코드에 더한 것

- `src/app/weather.py`: 가이드의 테스트 예제가 사용하는 `WeatherClient`를 구현했습니다. 네트워크 호출을 `_get` 한 곳에 모아 테스트에서 바꿔 끼울 수 있게 했습니다.
- `pyproject.toml`: `src/app`을 패키지로 설치하도록 `[build-system]`을, 테스트가 `app`을 찾도록 `[tool.pytest.ini_options]`를 추가했습니다.
- `examples/concurrency_demo.py`: `ProcessPoolExecutor`를 `if __name__ == "__main__":` 아래로 옮겼습니다. Windows와 macOS는 자식 프로세스가 파일을 다시 import하므로 이 가드가 없으면 오류가 납니다.
- `examples/context_managers.py`, `examples/files.py`, `examples/report.py`: 실행 위치와 상관없이 동작하도록 파일 경로를 정리했습니다.
- `examples/decorators.py`: 실행했을 때 결과를 볼 수 있도록 호출 코드를 추가했습니다.
