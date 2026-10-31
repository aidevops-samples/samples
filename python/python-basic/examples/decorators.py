# 섹션: 데코레이터
import functools
import random


def retry(times: int = 3):
    """인자를 받는 데코레이터는 함수를 한 겹 더 감싼 팩토리 구조입니다."""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            last_error: Exception | None = None
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as exc:
                    last_error = exc
                    print(f"[재시도 {attempt}/{times}] {func.__name__} 실패: {exc}")
            raise last_error
        return wrapper
    return decorator


@retry(times=3)
def call_flaky_api() -> str:
    # 절반의 확률로 실패하는 API를 흉내낸다
    if random.random() < 0.5:
        raise ConnectionError("일시적 네트워크 오류")
    return "ok"


# 내장 데코레이터
class Circle:
    def __init__(self, radius: float) -> None:
        self._radius = radius

    @property
    def area(self) -> float:
        return 3.14159 * self._radius ** 2

    @staticmethod
    def unit() -> "Circle":
        return Circle(1)


@functools.lru_cache(maxsize=None)
def fibonacci(n: int) -> int:
    return n if n < 2 else fibonacci(n - 1) + fibonacci(n - 2)


if __name__ == "__main__":
    try:
        print(call_flaky_api())
    except ConnectionError as exc:
        print(f"3번 모두 실패: {exc}")
    print(Circle.unit().area)
    print(fibonacci(80))
    print(call_flaky_api.__name__)  # functools.wraps 덕분에 wrapper가 아니라 원래 이름
