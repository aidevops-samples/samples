# 섹션: 타입 힌트 심화
from typing import Literal, Protocol, TypedDict


# 값이 없을 수도 있음을 명시 (Python 3.10+에서는 Optional[str] 대신 str | None)
def find_user(user_id: int) -> str | None:
    return "Ada" if user_id == 1 else None


# 여러 타입 중 하나
def parse_amount(value: int | str) -> float:
    return float(value)


# JSON처럼 구조가 정해진 dict 타입
class UserPayload(TypedDict):
    id: int
    name: str
    role: Literal["admin", "developer", "viewer"]


def greet(user: UserPayload) -> str:
    return f"{user['name']}({user['role']})님 환영합니다"


# 상속 없이 "이 메서드가 있으면 된다"는 구조적 타이핑
class SupportsTotal(Protocol):
    def total(self) -> float: ...


def print_total(item: SupportsTotal) -> None:
    print(f"합계: {item.total()}")


class Cart:
    # SupportsTotal을 상속하지 않았지만 total()이 있으므로 print_total에 넘길 수 있다
    def __init__(self, prices: list[float]) -> None:
        self.prices = prices

    def total(self) -> float:
        return sum(self.prices)


print(find_user(1), find_user(2))
print(parse_amount("12.5"))
print(greet({"id": 1, "name": "Ada", "role": "admin"}))
print_total(Cart([1000, 2500]))
