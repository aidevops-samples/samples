# 섹션: 예외 처리
from pathlib import Path


def read_config(path: str) -> dict[str, str]:
    file = Path(path)
    if not file.exists():
        raise FileNotFoundError(f"config not found: {path}")

    result: dict[str, str] = {}
    for line in file.read_text(encoding="utf-8").splitlines():
        if not line.strip() or line.startswith("#"):
            continue
        key, value = line.split("=", 1)
        result[key.strip()] = value.strip()
    return result


try:
    config = read_config("app.env")
except FileNotFoundError as exc:
    print(f"설정 오류: {exc}")
