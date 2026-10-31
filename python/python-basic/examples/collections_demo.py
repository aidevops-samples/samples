# 섹션: 자료구조
users = [
    {"id": 1, "name": "Ada", "role": "admin"},
    {"id": 2, "name": "Linus", "role": "developer"},
    {"id": 3, "name": "Grace", "role": "developer"},
]

names = [user["name"] for user in users]
developers = [u for u in users if u["role"] == "developer"]
user_by_id = {user["id"]: user for user in users}
roles = {user["role"] for user in users}

print(names)
print(user_by_id[2]["name"])
print(sorted(roles))
