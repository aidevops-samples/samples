// 가이드 "모듈과 선언 파일" — TypeScript로 옮기지 않은 기존 JavaScript 모듈.
// 타입 정보는 옆의 slugify.d.ts가 제공한다.
export function slugify(text, separator = '-') {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
}

export const VERSION = '1.2.0';
