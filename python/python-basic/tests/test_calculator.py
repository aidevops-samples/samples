import pytest
from app.calculator import add


def test_add():
    assert add(2, 3) == 5


@pytest.mark.parametrize("a,b,expected", [
    (1, 2, 3),
    (-1, 1, 0),
    (0, 0, 0),
])
def test_add_cases(a: int, b: int, expected: int):
    assert add(a, b) == expected
