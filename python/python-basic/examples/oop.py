# 섹션: 클래스와 객체지향
from dataclasses import dataclass


@dataclass
class Account:
    owner: str
    balance: int = 0

    def deposit(self, amount: int) -> None:
        if amount <= 0:
            raise ValueError("amount must be positive")
        self.balance += amount

    def withdraw(self, amount: int) -> None:
        if amount > self.balance:
            raise ValueError("insufficient balance")
        self.balance -= amount


account = Account("Ada")
account.deposit(10000)
account.withdraw(3000)
print(account.balance)
