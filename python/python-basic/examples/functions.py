# 섹션: 함수와 타입 힌트
from dataclasses import dataclass


@dataclass
class Order:
    id: int
    amount: float
    paid: bool = False


def total_paid(orders: list[Order]) -> float:
    return sum(order.amount for order in orders if order.paid)


def normalize_name(value: str) -> str:
    return value.strip().title()


orders = [Order(1, 12000, True), Order(2, 8000, False)]
print(total_paid(orders))
print(normalize_name("  ada lovelace "))
