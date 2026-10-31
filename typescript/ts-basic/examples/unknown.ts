// 가이드 "unknown과 외부 데이터 경계" — node examples/unknown.ts
import { parseJson, parseUser } from '../src/validate.ts';

// 서버에서 받았다고 가정한 응답 본문. 실제로는 fetch(...).then(r => r.text())
const responses = [
  '{"id": 1, "name": "김개발", "email": "kim@example.com", "tags": ["admin"]}',
  '{"id": "2", "name": "", "email": "lee.example.com"}',
  '{"id": 3, "name": "박신입", "email": "park@example.com"',
];

for (const body of responses) {
  const json = parseJson(body);
  if (!json.ok) {
    console.log('JSON 아님:', json.error);
    continue;
  }

  // json.value는 unknown — 검사 없이는 .name에 접근할 수 없다
  // console.log(json.value.name);   // TS18046: 'json.value' is of type 'unknown'

  const user = parseUser(json.value);
  if (user.ok) {
    console.log(`사용자: ${user.value.name} <${user.value.email}> tags=${user.value.tags.join('|') || '-'}`);
  } else {
    console.log('검증 실패:', user.error.join(' / '));
  }
}

// any는 검사를 끄고, unknown은 검사를 강제한다
const fromAny: any = JSON.parse('{"count": "3"}');
console.log('any는 실수를 통과시킨다:', fromAny.count + 1);   // "31" — 문자열 이어 붙이기
