# 섹션: 변수와 기본 문법
name = "AI DevOps"
score = 87
active = True

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
else:
    grade = "C"

for index in range(3):
    print(index, name, grade)


def format_user(name: str, score: int) -> str:
    return f"{name}: {score}점"


print(format_user(name, score))
