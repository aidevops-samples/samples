# 섹션: 컴프리헨션 & 제너레이터
from itertools import islice

# list/dict/set 컴프리헨션 — 즉시 전체를 메모리에 생성
squares = [n * n for n in range(10)]
even_squares = {n: n * n for n in range(10) if n % 2 == 0}


# 제너레이터 함수 — yield를 만날 때마다 하나씩 반환하고 멈춤
def read_large_file(path: str):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.strip()


# 제너레이터 표현식 — [] 대신 ()를 쓰면 지연 생성
total = sum(n * n for n in range(1_000_000))  # 리스트를 만들지 않고 즉시 합산


# itertools로 무한/대용량 스트림 다루기
def counter():
    n = 0
    while True:
        yield n
        n += 1


first_five = list(islice(counter(), 5))
print(squares)
print(even_squares)
print(total)
print(first_five)
