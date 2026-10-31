# 섹션: 컨텍스트 매니저 & 자원 관리
import tempfile
import time
from contextlib import contextmanager
from pathlib import Path


# 1) 클래스 기반 컨텍스트 매니저
class Timer:
    def __enter__(self):
        self._start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_value, traceback):
        elapsed = time.perf_counter() - self._start
        print(f"소요 시간: {elapsed:.3f}s")
        return False  # 예외를 삼키지 않고 그대로 전파


with Timer():
    time.sleep(0.1)


# 2) 제너레이터 기반 컨텍스트 매니저 — 훨씬 짧게 같은 역할 구현
@contextmanager
def timer():
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"소요 시간: {time.perf_counter() - start:.3f}s")


with timer():
    time.sleep(0.1)

# 3) 여러 자원을 동시에 정리 — 임시 디렉터리도 with가 끝나면 삭제된다
with tempfile.TemporaryDirectory() as tmp:
    src_path = Path(tmp) / "in.txt"
    dst_path = Path(tmp) / "out.txt"
    src_path.write_text("hello context manager", encoding="utf-8")

    with open(src_path, encoding="utf-8") as src, open(dst_path, "w", encoding="utf-8") as dst:
        dst.write(src.read().upper())

    print(dst_path.read_text(encoding="utf-8"))
