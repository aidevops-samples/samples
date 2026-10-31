// slugify.js의 타입 선언. 구현은 없고 모양만 적는다.
// TypeScript는 './legacy/slugify.js'를 import할 때 이 파일에서 타입을 읽는다.

/** 문자열을 URL에 쓰기 좋은 형태로 바꾼다. 한글·숫자는 남기고 나머지는 separator로 바꾼다. */
export declare function slugify(text: string, separator?: string): string;

export declare const VERSION: string;
