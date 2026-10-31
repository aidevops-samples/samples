# 섹션: 표준 라이브러리 활용
# 실행: python examples/report.py --file examples/orders.csv
import argparse
import csv
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")

parser = argparse.ArgumentParser()
parser.add_argument("--file", default=str(Path(__file__).parent / "orders.csv"))
args = parser.parse_args()

path = Path(args.file)
total = 0

with path.open(encoding="utf-8", newline="") as f:
    for row in csv.DictReader(f):
        total += int(row["amount"])

logging.info("total amount: %s", total)
