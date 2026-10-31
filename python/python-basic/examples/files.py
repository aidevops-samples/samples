# 섹션: 파일 입출력
import json
from pathlib import Path

# 실행 위치와 상관없이 이 파일 옆의 data 디렉터리를 쓴다
data_dir = Path(__file__).parent / "data"
data_dir.mkdir(exist_ok=True)

users = [{"id": 1, "name": "Ada"}, {"id": 2, "name": "Linus"}]
path = data_dir / "users.json"

path.write_text(json.dumps(users, ensure_ascii=False, indent=2), encoding="utf-8")
loaded = json.loads(path.read_text(encoding="utf-8"))

for user in loaded:
    print(user["id"], user["name"])
